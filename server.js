const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8925;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const questionBank = [
  { id: 1, type: '选择题', score: 3, difficulty: '简单', knowledge: ['函数概念'], content: '下列关系式中，表示y是x的函数的是()' },
  { id: 2, type: '选择题', score: 3, difficulty: '简单', knowledge: ['函数概念'], content: '函数y=√(x-1)的定义域是()' },
  { id: 3, type: '选择题', score: 3, difficulty: '中等', knowledge: ['函数性质'], content: '函数f(x)=x²-2x+3的最小值是()' },
  { id: 4, type: '选择题', score: 3, difficulty: '中等', knowledge: ['函数性质'], content: '下列函数中，是偶函数的是()' },
  { id: 5, type: '选择题', score: 3, difficulty: '困难', knowledge: ['函数综合'], content: '已知f(x)是定义在R上的奇函数，当x>0时，f(x)=x²-2x，则f(-1)=()' },
  { id: 6, type: '选择题', score: 3, difficulty: '困难', knowledge: ['函数综合'], content: '函数f(x)=ln(x²-3x+2)的单调递增区间是()' },
  { id: 7, type: '选择题', score: 3, difficulty: '简单', knowledge: ['三角函数'], content: 'sin30°的值是()' },
  { id: 8, type: '选择题', score: 3, difficulty: '中等', knowledge: ['三角函数'], content: '函数y=sin(2x+π/6)的最小正周期是()' },
  { id: 9, type: '选择题', score: 3, difficulty: '困难', knowledge: ['三角函数'], content: '已知sinα+cosα=√2，则sinα·cosα=()' },
  { id: 10, type: '选择题', score: 3, difficulty: '简单', knowledge: ['数列概念'], content: '数列1,3,5,7,...的第n项是()' },
  { id: 11, type: '选择题', score: 3, difficulty: '中等', knowledge: ['等差数列'], content: '等差数列{an}中，a1=2，d=3，则a10=()' },
  { id: 12, type: '选择题', score: 3, difficulty: '困难', knowledge: ['等比数列'], content: '等比数列{an}中，a1=1，q=2，则S6=()' },
  { id: 13, type: '填空题', score: 4, difficulty: '简单', knowledge: ['函数概念'], content: '函数y=1/(x-2)的定义域是______' },
  { id: 14, type: '填空题', score: 4, difficulty: '中等', knowledge: ['函数性质'], content: '函数f(x)=2x+1在区间[0,3]上的最大值是______' },
  { id: 15, type: '填空题', score: 4, difficulty: '困难', knowledge: ['函数综合'], content: '已知f(x+1)=x²-2x，则f(x)=______' },
  { id: 16, type: '填空题', score: 4, difficulty: '简单', knowledge: ['三角函数'], content: 'cos60°=______' },
  { id: 17, type: '填空题', score: 4, difficulty: '中等', knowledge: ['三角函数'], content: 'tan45°=______' },
  { id: 18, type: '填空题', score: 4, difficulty: '困难', knowledge: ['三角函数'], content: 'sin²α+cos²α=______' },
  { id: 19, type: '填空题', score: 4, difficulty: '简单', knowledge: ['等差数列'], content: '等差数列1,4,7,10,...的公差d=______' },
  { id: 20, type: '填空题', score: 4, difficulty: '中等', knowledge: ['等比数列'], content: '等比数列2,6,18,...的公比q=______' },
  { id: 21, type: '解答题', score: 10, difficulty: '简单', knowledge: ['函数概念'], content: '求函数y=√(2x-4)的定义域。' },
  { id: 22, type: '解答题', score: 10, difficulty: '中等', knowledge: ['函数性质'], content: '判断函数f(x)=x³的奇偶性，并证明。' },
  { id: 23, type: '解答题', score: 10, difficulty: '困难', knowledge: ['函数综合'], content: '已知函数f(x)=x²-2ax+1在区间[0,2]上的最小值为-3，求a的值。' },
  { id: 24, type: '解答题', score: 10, difficulty: '简单', knowledge: ['三角函数'], content: '求sin²30°+cos²30°的值。' },
  { id: 25, type: '解答题', score: 10, difficulty: '中等', knowledge: ['三角函数'], content: '已知sinα=3/5，α∈(0,π/2)，求cosα和tanα的值。' },
  { id: 26, type: '解答题', score: 10, difficulty: '困难', knowledge: ['三角函数'], content: '求函数f(x)=sinx+cosx的最大值和最小值。' },
  { id: 27, type: '解答题', score: 10, difficulty: '简单', knowledge: ['等差数列'], content: '等差数列{an}中，a1=3，d=2，求S10。' },
  { id: 28, type: '解答题', score: 10, difficulty: '中等', knowledge: ['等比数列'], content: '等比数列{an}中，a1=1，a4=8，求公比q和S5。' },
  { id: 29, type: '解答题', score: 15, difficulty: '困难', knowledge: ['数列综合'], content: '已知数列{an}满足a1=1，an+1=2an+1，求数列{an}的通项公式。' },
  { id: 30, type: '解答题', score: 15, difficulty: '困难', knowledge: ['函数综合'], content: '讨论函数f(x)=x+4/x在区间(0,+∞)上的单调性，并求其最小值。' },
  { id: 31, type: '选择题', score: 3, difficulty: '简单', knowledge: ['向量概念'], content: '下列物理量中，是向量的是()' },
  { id: 32, type: '选择题', score: 3, difficulty: '中等', knowledge: ['向量运算'], content: '已知向量a=(1,2)，b=(3,-1)，则a·b=()' },
  { id: 33, type: '选择题', score: 3, difficulty: '困难', knowledge: ['向量综合'], content: '已知|a|=3，|b|=4，a与b的夹角为60°，则|a-b|=()' },
  { id: 34, type: '填空题', score: 4, difficulty: '简单', knowledge: ['向量概念'], content: '向量的两个要素是大小和______' },
  { id: 35, type: '填空题', score: 4, difficulty: '中等', knowledge: ['向量运算'], content: '已知a=(2,3)，b=(-1,2)，则2a-b=______' },
  { id: 36, type: '解答题', score: 10, difficulty: '中等', knowledge: ['向量综合'], content: '已知|a|=2，|b|=3，a·b=3，求a与b的夹角。' },
  { id: 37, type: '选择题', score: 3, difficulty: '简单', knowledge: ['不等式性质'], content: '若a>b，则下列不等式成立的是()' },
  { id: 38, type: '选择题', score: 3, difficulty: '中等', knowledge: ['一元二次不等式'], content: '不等式x²-5x+6<0的解集是()' },
  { id: 39, type: '选择题', score: 3, difficulty: '困难', knowledge: ['不等式综合'], content: '若x>0，则x+1/x的最小值是()' },
  { id: 40, type: '填空题', score: 4, difficulty: '中等', knowledge: ['一元二次不等式'], content: '不等式x²≥4的解集是______' },
  { id: 41, type: '解答题', score: 10, difficulty: '中等', knowledge: ['不等式综合'], content: '用基本不等式证明：当x>0时，x+4/x≥4。' },
  { id: 42, type: '解答题', score: 15, difficulty: '困难', knowledge: ['不等式综合'], content: '已知x>0，y>0，x+2y=1，求1/x+1/y的最小值。' }
];

const difficultyWeight = { '简单': 1, '中等': 2, '困难': 3 };
const difficultyScore = { '简单': 1, '中等': 2, '困难': 3 };

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function calculatePaperScore(paper) {
  return paper.reduce((sum, q) => sum + q.score, 0);
}

function calculateKnowledgeCoverage(paper, knowledgeList) {
  const covered = new Set();
  paper.forEach(q => {
    q.knowledge.forEach(k => {
      if (knowledgeList.includes(k)) covered.add(k);
    });
  });
  return covered.size / knowledgeList.length;
}

function calculateDifficultyRatio(paper) {
  const total = paper.length;
  if (total === 0) return { simple: 0, medium: 0, hard: 0 };
  let simple = 0, medium = 0, hard = 0;
  paper.forEach(q => {
    if (q.difficulty === '简单') simple++;
    else if (q.difficulty === '中等') medium++;
    else if (q.difficulty === '困难') hard++;
  });
  return {
    simple: simple / total,
    medium: medium / total,
    hard: hard / total
  };
}

function hasKnowledgeDuplication(paper, knowledgeList) {
  const knowledgeCount = {};
  knowledgeList.forEach(k => knowledgeCount[k] = 0);
  paper.forEach(q => {
    q.knowledge.forEach(k => {
      if (knowledgeList.includes(k)) knowledgeCount[k]++;
    });
  });
  const values = Object.values(knowledgeCount).filter(v => v > 0);
  if (values.length === 0) return true;
  const max = Math.max(...values);
  const min = Math.min(...values);
  return max - min > 2;
}

function calculateFitness(paper, targetScore, knowledgeList, targetRatio, knowledgeWeights) {
  let score = 0;
  const actualScore = calculatePaperScore(paper);
  const scoreDiff = Math.abs(actualScore - targetScore);
  score -= scoreDiff * 10;

  const coverage = calculateKnowledgeCoverage(paper, knowledgeList);
  if (coverage < 1) {
    score -= (1 - coverage) * 200;
  } else {
    score += 50;
  }

  const actualRatio = calculateDifficultyRatio(paper);
  const ratioDiff = Math.abs(actualRatio.simple - targetRatio.simple) +
                    Math.abs(actualRatio.medium - targetRatio.medium) +
                    Math.abs(actualRatio.hard - targetRatio.hard);
  score -= ratioDiff * 80;

  if (hasKnowledgeDuplication(paper, knowledgeList)) {
    score -= 100;
  }

  paper.forEach(q => {
    q.knowledge.forEach(k => {
      if (knowledgeWeights[k]) {
        score += knowledgeWeights[k] * 5;
      }
    });
  });

  return score;
}

function generateSinglePaper(targetScore, knowledgeList, targetRatio, knowledgeWeights, excludeIds = []) {
  const availableQuestions = questionBank.filter(q => !excludeIds.includes(q.id));
  let bestPaper = [];
  let bestFitness = -Infinity;

  for (let attempt = 0; attempt < 200; attempt++) {
    let currentPaper = [];
    let currentScore = 0;
    const usedKnowledge = {};
    const shuffled = shuffleArray(availableQuestions);

    for (const q of shuffled) {
      if (currentScore + q.score > targetScore + 5) continue;
      if (currentScore >= targetScore - 5 && currentScore <= targetScore + 5) break;

      let tooMuch = false;
      q.knowledge.forEach(k => {
        if (knowledgeList.includes(k) && (usedKnowledge[k] || 0) >= 3) {
          tooMuch = true;
        }
      });
      if (tooMuch) continue;

      currentPaper.push(q);
      currentScore += q.score;
      q.knowledge.forEach(k => {
        usedKnowledge[k] = (usedKnowledge[k] || 0) + 1;
      });
    }

    const fitness = calculateFitness(currentPaper, targetScore, knowledgeList, targetRatio, knowledgeWeights);
    if (fitness > bestFitness) {
      bestFitness = fitness;
      bestPaper = [...currentPaper];
    }
  }

  return {
    questions: bestPaper,
    totalScore: calculatePaperScore(bestPaper),
    coverage: calculateKnowledgeCoverage(bestPaper, knowledgeList),
    difficultyRatio: calculateDifficultyRatio(bestPaper),
    fitness: bestFitness
  };
}

function generatePapers(targetScore, knowledgeList, targetRatio, knowledgeWeights, count = 3) {
  const papers = [];
  const usedIds = [];

  for (let i = 0; i < count; i++) {
    const paper = generateSinglePaper(targetScore, knowledgeList, targetRatio, knowledgeWeights, usedIds);
    papers.push(paper);
    paper.questions.forEach(q => usedIds.push(q.id));
  }

  papers.sort((a, b) => b.fitness - a.fitness);
  return papers.map((p, idx) => ({
    id: idx + 1,
    ...p,
    coverage: (p.coverage * 100).toFixed(1) + '%',
    difficultyRatio: {
      simple: (p.difficultyRatio.simple * 100).toFixed(1) + '%',
      medium: (p.difficultyRatio.medium * 100).toFixed(1) + '%',
      hard: (p.difficultyRatio.hard * 100).toFixed(1) + '%'
    }
  }));
}

app.get('/api/knowledge-points', (req, res) => {
  const knowledgeSet = new Set();
  questionBank.forEach(q => q.knowledge.forEach(k => knowledgeSet.add(k)));
  res.json(Array.from(knowledgeSet).sort());
});

app.get('/api/question-bank', (req, res) => {
  res.json(questionBank);
});

app.get('/api/question-bank/stats', (req, res) => {
  const total = questionBank.length;
  const byDifficulty = { '简单': 0, '中等': 0, '困难': 0 };
  const byType = {};
  const knowledgeSet = new Set();
  questionBank.forEach(q => {
    byDifficulty[q.difficulty]++;
    byType[q.type] = (byType[q.type] || 0) + 1;
    q.knowledge.forEach(k => knowledgeSet.add(k));
  });
  res.json({
    total,
    byDifficulty,
    byType,
    knowledgeCount: knowledgeSet.size,
    totalScore: questionBank.reduce((s, q) => s + q.score, 0)
  });
});

app.post('/api/generate-papers', (req, res) => {
  try {
    const {
      totalScore = 100,
      knowledgeList = [],
      difficultyRatio = { simple: 0.3, medium: 0.5, hard: 0.2 },
      knowledgeWeights = {},
      paperCount = 3
    } = req.body;

    if (!knowledgeList || knowledgeList.length === 0) {
      return res.status(400).json({ error: '请至少选择一个知识点' });
    }

    const ratioSum = difficultyRatio.simple + difficultyRatio.medium + difficultyRatio.hard;
    if (Math.abs(ratioSum - 1) > 0.01) {
      return res.status(400).json({ error: '难易占比之和必须等于100%' });
    }

    const papers = generatePapers(totalScore, knowledgeList, difficultyRatio, knowledgeWeights, paperCount);

    res.json({
      success: true,
      params: {
        totalScore,
        knowledgeList,
        difficultyRatio: {
          simple: (difficultyRatio.simple * 100).toFixed(1) + '%',
          medium: (difficultyRatio.medium * 100).toFixed(1) + '%',
          hard: (difficultyRatio.hard * 100).toFixed(1) + '%'
        },
        paperCount
      },
      papers
    });
  } catch (error) {
    console.error('生成试卷出错:', error);
    res.status(500).json({ error: '生成试卷时发生错误: ' + error.message });
  }
});

app.post('/api/validate-params', (req, res) => {
  try {
    const { totalScore, knowledgeList, difficultyRatio } = req.body;
    const issues = [];
    const warnings = [];

    if (!totalScore || totalScore <= 0) {
      issues.push('试卷总分必须大于0');
    } else if (totalScore > 500) {
      warnings.push('试卷总分较高，建议确认是否正确');
    }

    if (!knowledgeList || knowledgeList.length === 0) {
      issues.push('请至少选择一个知识点');
    } else {
      const availableQuestions = questionBank.filter(q =>
        q.knowledge.some(k => knowledgeList.includes(k))
      );
      const availableScore = availableQuestions.reduce((s, q) => s + q.score, 0);
      if (availableScore < totalScore) {
        issues.push(`题库中所选知识点的可用分数为${availableScore}分，不足以组成${totalScore}分的试卷`);
      }
      if (availableQuestions.length < 5) {
        warnings.push('符合条件的题目数量较少，组卷多样性可能不足');
      }
    }

    if (difficultyRatio) {
      const ratioSum = (difficultyRatio.simple || 0) + (difficultyRatio.medium || 0) + (difficultyRatio.hard || 0);
      if (Math.abs(ratioSum - 1) > 0.01) {
        issues.push(`难易占比之和为${(ratioSum * 100).toFixed(1)}%，必须等于100%`);
      }
    }

    res.json({
      valid: issues.length === 0,
      issues,
      warnings
    });
  } catch (error) {
    res.status(500).json({ error: '参数校验失败: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`  AI智能组卷系统已启动`);
  console.log(`  API服务端口: ${PORT}`);
  console.log(`  访问地址: http://localhost:${PORT}`);
  console.log(`========================================`);
});
