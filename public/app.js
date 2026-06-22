const API_BASE = '';

let knowledgePoints = [];
let currentParams = null;
let currentPapers = null;

async function checkServerStatus() {
    try {
        const res = await fetch(`${API_BASE}/api/question-bank/stats`);
        if (res.ok) {
            const data = await res.json();
            document.getElementById('statusText').textContent = `AI算力正常 · 题库 ${data.total} 题`;
            document.getElementById('serverStatus').classList.remove('error');
            return true;
        }
    } catch (e) {
    }
    document.getElementById('statusText').textContent = '服务未连接';
    document.getElementById('serverStatus').classList.add('error');
    return false;
}

async function loadKnowledgePoints() {
    try {
        const res = await fetch(`${API_BASE}/api/knowledge-points`);
        if (res.ok) {
            knowledgePoints = await res.json();
            renderKnowledgeList();
        }
    } catch (e) {
        console.error('加载知识点失败:', e);
    }
}

function renderKnowledgeList() {
    const container = document.getElementById('knowledgeList');
    container.innerHTML = knowledgePoints.map(k => `
        <div class="knowledge-item" data-kp="${k}">
            <input type="checkbox" id="kp-${k}" value="${k}" onchange="toggleKnowledge('${k}')">
            <label for="kp-${k}" class="knowledge-name">${k}</label>
            <div class="weight-control">
                <label>权重</label>
                <input type="number" id="weight-${k}" value="1" min="0" max="5" step="0.5" disabled>
            </div>
        </div>
    `).join('');
}

function toggleKnowledge(kp) {
    const item = document.querySelector(`.knowledge-item[data-kp="${kp}"]`);
    const checkbox = document.getElementById(`kp-${kp}`);
    const weightInput = document.getElementById(`weight-${kp}`);
    if (checkbox.checked) {
        item.classList.add('selected');
        weightInput.disabled = false;
    } else {
        item.classList.remove('selected');
        weightInput.disabled = true;
    }
}

document.getElementById('selectAll').addEventListener('click', () => {
    knowledgePoints.forEach(kp => {
        document.getElementById(`kp-${kp}`).checked = true;
        toggleKnowledge(kp);
    });
});

document.getElementById('clearAll').addEventListener('click', () => {
    knowledgePoints.forEach(kp => {
        document.getElementById(`kp-${kp}`).checked = false;
        toggleKnowledge(kp);
    });
});

function updateRatioTotal() {
    const simple = parseFloat(document.getElementById('diffSimple').value) || 0;
    const medium = parseFloat(document.getElementById('diffMedium').value) || 0;
    const hard = parseFloat(document.getElementById('diffHard').value) || 0;
    const total = simple + medium + hard;
    const el = document.getElementById('ratioTotal');
    el.textContent = total.toFixed(1) + '%';
    if (Math.abs(total - 100) < 0.5) {
        el.classList.remove('ratio-error');
        el.classList.add('ratio-ok');
    } else {
        el.classList.remove('ratio-ok');
        el.classList.add('ratio-error');
    }
}

['diffSimple', 'diffMedium', 'diffHard'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateRatioTotal);
});

function collectParams() {
    const totalScore = parseInt(document.getElementById('totalScore').value) || 0;
    const selectedKnowledge = [];
    const knowledgeWeights = {};
    knowledgePoints.forEach(kp => {
        if (document.getElementById(`kp-${kp}`).checked) {
            selectedKnowledge.push(kp);
            const w = parseFloat(document.getElementById(`weight-${kp}`).value) || 1;
            if (w > 0) knowledgeWeights[kp] = w;
        }
    });

    const simple = (parseFloat(document.getElementById('diffSimple').value) || 0) / 100;
    const medium = (parseFloat(document.getElementById('diffMedium').value) || 0) / 100;
    const hard = (parseFloat(document.getElementById('diffHard').value) || 0) / 100;

    const paperCount = parseInt(document.getElementById('paperCount').value) || 3;

    return {
        totalScore,
        knowledgeList: selectedKnowledge,
        difficultyRatio: { simple, medium, hard },
        knowledgeWeights,
        paperCount
    };
}

async function validateParams() {
    const params = collectParams();
    const box = document.getElementById('validationBox');
    const content = document.getElementById('validationContent');

    try {
        const res = await fetch(`${API_BASE}/api/validate-params`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        const data = await res.json();

        box.style.display = 'block';
        box.className = 'validation-box ' + (data.valid ? 'valid' : 'invalid');

        let html = '<div class="validation-content"><ul>';
        if (data.issues && data.issues.length > 0) {
            data.issues.forEach(i => {
                html += `<li class="issue">${i}</li>`;
            });
        }
        if (data.warnings && data.warnings.length > 0) {
            data.warnings.forEach(w => {
                html += `<li class="warning">${w}</li>`;
            });
        }
        if (data.valid && (!data.warnings || data.warnings.length === 0)) {
            html += `<li class="ok">所有参数校验通过，可以开始组卷</li>`;
        } else if (data.valid) {
            html += `<li class="ok">参数有效（有若干提醒项）</li>`;
        }
        html += '</ul></div>';
        content.innerHTML = html;
    } catch (e) {
        box.style.display = 'block';
        box.className = 'validation-box invalid';
        content.innerHTML = `<div class="validation-content"><ul><li class="issue">校验请求失败：${e.message}</li></ul></div>`;
    }
}

async function generatePapers() {
    const params = collectParams();
    currentParams = params;

    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('generateBtn').disabled = true;

    try {
        const res = await fetch(`${API_BASE}/api/generate-papers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || '组卷失败');
        }

        currentPapers = data.papers;
        renderResults(data);
    } catch (e) {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('emptyState').style.display = 'block';
        alert('组卷失败：' + e.message);
    } finally {
        document.getElementById('generateBtn').disabled = false;
    }
}

function renderResults(data) {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('resultContent').style.display = 'block';
    document.getElementById('resultCount').style.display = 'inline';
    document.getElementById('resultCount').textContent = `生成 ${data.papers.length} 套`;

    const summary = document.getElementById('resultSummary');
    const p = data.params;
    summary.innerHTML = `
        <div class="summary-row">
            <strong>试卷总分：</strong>${p.totalScore} 分
        </div>
        <div class="summary-row">
            <strong>知识点覆盖：</strong>
            <span class="knowledge-tags">
                ${p.knowledgeList.map(k => `<span class="knowledge-tag">${k}</span>`).join('')}
            </span>
        </div>
        <div class="summary-row">
            <strong>难易占比：</strong>
            简单 ${p.difficultyRatio.simple} / 中等 ${p.difficultyRatio.medium} / 困难 ${p.difficultyRatio.hard}
        </div>
    `;

    const container = document.getElementById('papersContainer');
    container.innerHTML = data.papers.map((paper, idx) => renderPaper(paper, idx)).join('');
}

function renderPaper(paper, idx) {
    const questionsByType = {};
    paper.questions.forEach((q, i) => {
        if (!questionsByType[q.type]) questionsByType[q.type] = [];
        questionsByType[q.type].push({ ...q, index: i + 1 });
    });

    const typeOrder = ['选择题', '填空题', '解答题'];
    const typeScores = {};
    Object.keys(questionsByType).forEach(t => {
        typeScores[t] = questionsByType[t].reduce((s, q) => s + q.score, 0);
    });

    let qNum = 1;
    const questionsHtml = typeOrder.filter(t => questionsByType[t]).map(type => {
        const typeQuestions = questionsByType[type];
        const typeScore = typeScores[type];
        const html = `
            <div class="question-type-group">
                <div class="question-type-title">
                    <span>${type}（共 ${typeQuestions.length} 题，${typeScore} 分）</span>
                    <span class="type-subtotal"></span>
                </div>
                ${typeQuestions.map(q => {
                    const num = qNum++;
                    return `
                    <div class="question-item">
                        <div class="question-number">${num}</div>
                        <div class="question-content">
                            <div class="question-text">${q.content}</div>
                            <div class="question-meta">
                                <span class="diff-tag diff-${q.difficulty === '简单' ? 'simple' : q.difficulty === '中等' ? 'medium' : 'hard'}">${q.difficulty}</span>
                                ${q.knowledge.map(k => `<span class="knowledge-chip">${k}</span>`).join('')}
                            </div>
                        </div>
                        <div class="question-score">${q.score}<small>分</small></div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
        return html;
    }).join('');

    const sRatio = paper.difficultyRatio;

    return `
        <div class="paper-card">
            <div class="paper-header">
                <div class="paper-title">
                    <div class="paper-number">${paper.id}</div>
                    <div class="paper-name">试卷方案 ${paper.id}</div>
                </div>
                <div class="paper-score">${paper.totalScore}<small> 分</small></div>
            </div>
            <div class="paper-stats">
                <div class="stat-item">
                    <div class="stat-label">题目总数</div>
                    <div class="stat-value">${paper.questions.length} 题</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">知识点覆盖率</div>
                    <div class="stat-value coverage">${paper.coverage}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">题型种类</div>
                    <div class="stat-value">${Object.keys(questionsByType).length} 种</div>
                </div>
            </div>
            <div class="difficulty-bars">
                <div class="diff-bar-item">
                    <div class="diff-bar-label"><span class="diff-tag diff-simple">简单</span></div>
                    <div class="diff-bar-container"><div class="diff-bar-fill simple" style="width:${sRatio.simple}"></div></div>
                    <div class="diff-bar-value">${sRatio.simple}</div>
                </div>
                <div class="diff-bar-item">
                    <div class="diff-bar-label"><span class="diff-tag diff-medium">中等</span></div>
                    <div class="diff-bar-container"><div class="diff-bar-fill medium" style="width:${sRatio.medium}"></div></div>
                    <div class="diff-bar-value">${sRatio.medium}</div>
                </div>
                <div class="diff-bar-item">
                    <div class="diff-bar-label"><span class="diff-tag diff-hard">困难</span></div>
                    <div class="diff-bar-container"><div class="diff-bar-fill hard" style="width:${sRatio.hard}"></div></div>
                    <div class="diff-bar-value">${sRatio.hard}</div>
                </div>
            </div>
            <div class="questions-list">
                ${questionsHtml}
            </div>
            <div class="paper-actions">
                <button class="action-btn primary" onclick="alert('已选择试卷方案 ${paper.id}')">
                    <span>✅</span>选用此方案
                </button>
                <button class="action-btn" onclick="window.print()">
                    <span>🖨️</span>打印试卷
                </button>
                <button class="action-btn" onclick="copyPaper(${idx})">
                    <span>📋</span>复制题目
                </button>
            </div>
        </div>
    `;
}

function copyPaper(idx) {
    if (!currentPapers || !currentPapers[idx]) return;
    const paper = currentPapers[idx];
    let text = `试卷方案 ${paper.id}（总分 ${paper.totalScore} 分）\n`;
    text += '='.repeat(50) + '\n\n';
    const questionsByType = {};
    paper.questions.forEach(q => {
        if (!questionsByType[q.type]) questionsByType[q.type] = [];
        questionsByType[q.type].push(q);
    });
    let n = 1;
    ['选择题', '填空题', '解答题'].forEach(type => {
        if (questionsByType[type]) {
            text += `【${type}】\n`;
            questionsByType[type].forEach(q => {
                text += `${n}. ${q.content} （${q.score}分 · ${q.difficulty}）\n`;
                n++;
            });
            text += '\n';
        }
    });
    navigator.clipboard.writeText(text).then(() => {
        alert('试卷内容已复制到剪贴板！');
    }).catch(() => {
        alert('复制失败，请手动选择复制');
    });
}

document.getElementById('validateBtn').addEventListener('click', validateParams);
document.getElementById('generateBtn').addEventListener('click', generatePapers);

['totalScore', 'diffSimple', 'diffMedium', 'diffHard', 'paperCount'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
        document.getElementById('validationBox').style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
    loadKnowledgePoints();
    updateRatioTotal();
    setInterval(checkServerStatus, 30000);
});
