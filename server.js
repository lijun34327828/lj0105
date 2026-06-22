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

function calculateDifficultyScoreRatio(paper) {
  const total = calculatePaperScore(paper);
  if (total === 0) return { simple: 0, medium: 0, hard: 0 };
  let simple = 0, medium = 0, hard = 0;
  paper.forEach(q => {
    if (q.difficulty === '简单') simple += q.score;
    else if (q.difficulty === '中等') medium += q.score;
    else if (q.difficulty === '困难') hard += q.score;
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
  return max - min > 3;
}

function validatePaper(paper, targetScore, knowledgeList, targetRatio) {
  const errors = [];
  const actualScore = calculatePaperScore(paper);
  if (actualScore !== targetScore) {
    errors.push(`总分不达标：实际${actualScore}分，目标${targetScore}分`);
  }
  const coverage = calculateKnowledgeCoverage(paper, knowledgeList);
  if (coverage < 1) {
    errors.push(`知识点未全覆盖：覆盖率${(coverage * 100).toFixed(1)}%`);
  }
  const scoreRatio = calculateDifficultyScoreRatio(paper);
  const ratioTolerance = 0.06;
  if (Math.abs(scoreRatio.simple - targetRatio.simple) > ratioTolerance) {
    errors.push(`简单题占比偏差：实际${(scoreRatio.simple * 100).toFixed(1)}%，目标${(targetRatio.simple * 100).toFixed(1)}%`);
  }
  if (Math.abs(scoreRatio.medium - targetRatio.medium) > ratioTolerance) {
    errors.push(`中等题占比偏差：实际${(scoreRatio.medium * 100).toFixed(1)}%，目标${(targetRatio.medium * 100).toFixed(1)}%`);
  }
  if (Math.abs(scoreRatio.hard - targetRatio.hard) > ratioTolerance) {
    errors.push(`困难题占比偏差：实际${(scoreRatio.hard * 100).toFixed(1)}%，目标${(targetRatio.hard * 100).toFixed(1)}%`);
  }
  return { valid: errors.length === 0, errors };
}

function calculateFitness(paper, targetScore, knowledgeList, targetRatio, knowledgeWeights) {
  let score = 0;
  const actualScore = calculatePaperScore(paper);
  const scoreDiff = Math.abs(actualScore - targetScore);
  score -= scoreDiff * 50;

  const coverage = calculateKnowledgeCoverage(paper, knowledgeList);
  if (coverage < 1) {
    score -= (1 - coverage) * 500;
  } else {
    score += 100;
  }

  const scoreRatio = calculateDifficultyScoreRatio(paper);
  const ratioDiff = Math.abs(scoreRatio.simple - targetRatio.simple) +
                    Math.abs(scoreRatio.medium - targetRatio.medium) +
                    Math.abs(scoreRatio.hard - targetRatio.hard);
  score -= ratioDiff * 300;

  if (hasKnowledgeDuplication(paper, knowledgeList)) {
    score -= 150;
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

function generateSinglePaper(targetScore, knowledgeList, targetRatio, knowledgeWeights) {
  const targetSimpleScore = targetScore * targetRatio.simple;
  const targetMediumScore = targetScore * targetRatio.medium;
  const targetHardScore = targetScore * targetRatio.hard;

  const availableQuestions = questionBank.filter(q =>
    q.knowledge.some(k => knowledgeList.includes(k))
  );

  const questionsByKnowledge = {};
  knowledgeList.forEach(k => {
    questionsByKnowledge[k] = availableQuestions.filter(q =>
      q.knowledge.includes(k)
    );
  });

  let bestPaper = [];
  let bestFitness = -Infinity;
  let bestErrors = [];
  const totalAttempts = 500;

  for (let attempt = 0; attempt < totalAttempts; attempt++) {
    let currentPaper = [];
    let currentScore = 0;
    let simpleScore = 0, mediumScore = 0, hardScore = 0;
    const coveredKnowledge = new Set();
    const usedIdsThisPaper = new Set();
    const knowledgeQuestionCount = {};
    knowledgeList.forEach(k => knowledgeQuestionCount[k] = 0);

    const tryAddQuestion = (q) => {
      if (usedIdsThisPaper.has(q.id)) return false;
      if (currentScore + q.score > targetScore) return false;
      currentPaper.push(q);
      currentScore += q.score;
      usedIdsThisPaper.add(q.id);
      if (q.difficulty === '简单') simpleScore += q.score;
      else if (q.difficulty === '中等') mediumScore += q.score;
      else hardScore += q.score;
      q.knowledge.forEach(k => {
        if (knowledgeList.includes(k)) {
          coveredKnowledge.add(k);
          knowledgeQuestionCount[k]++;
        }
      });
      return true;
    };

    const difficultyOrder = (() => {
      if (attempt % 6 === 0) return ['简单', '中等', '困难'];
      if (attempt % 6 === 1) return ['困难', '中等', '简单'];
      if (attempt % 6 === 2) return ['中等', '简单', '困难'];
      if (attempt % 6 === 3) return ['简单', '困难', '中等'];
      if (attempt % 6 === 4) return ['中等', '困难', '简单'];
      return ['困难', '简单', '中等'];
    })();

    const shuffledKnowledge = shuffleArray([...knowledgeList]);
    for (const kp of shuffledKnowledge) {
      if (coveredKnowledge.has(kp)) continue;
      const kpQuestions = shuffleArray(questionsByKnowledge[kp]);
      const sorted = [];
      difficultyOrder.forEach(d => kpQuestions.filter(q => q.difficulty === d).forEach(q => sorted.push(q)));
      let added = false;
      for (const q of sorted) {
        const qDiffScore = q.difficulty === '简单' ? simpleScore : q.difficulty === '中等' ? mediumScore : hardScore;
        const qTarget = q.difficulty === '简单' ? targetSimpleScore : q.difficulty === '中等' ? targetMediumScore : targetHardScore;
        if (qDiffScore + q.score > qTarget * 1.25 && !added) continue;
        if (tryAddQuestion(q)) { added = true; break; }
      }
      if (!added) {
        for (const q of kpQuestions) {
          if (tryAddQuestion(q)) { added = true; break; }
        }
      }
    }

    const addByDifficulty = (diff, targetDiffScore, maxExcessRatio = 1.15) => {
      const pool = shuffleArray(availableQuestions.filter(q => q.difficulty === diff));
      const curDiffScore = diff === '简单' ? simpleScore : diff === '中等' ? mediumScore : hardScore;
      let scoreToAdd = targetDiffScore - curDiffScore;
      if (scoreToAdd <= 0) return;
      for (const q of pool) {
        if (scoreToAdd <= 0) break;
        if (usedIdsThisPaper.has(q.id)) continue;
        const remainingTotal = targetScore - currentScore;
        if (q.score > remainingTotal) continue;
        const qDiffScore = diff === '简单' ? simpleScore : diff === '中等' ? mediumScore : hardScore;
        if (qDiffScore + q.score > targetDiffScore * maxExcessRatio && remainingTotal > q.score) continue;
        if (tryAddQuestion(q)) {
          scoreToAdd -= q.score;
        }
      }
    };

    addByDifficulty('简单', targetSimpleScore, 1.2);
    addByDifficulty('中等', targetMediumScore, 1.2);
    addByDifficulty('困难', targetHardScore, 1.25);

    if (currentScore < targetScore) {
      for (let rep = 0; rep < 30 && currentScore < targetScore; rep++) {
        let progress = false;
        const remaining = targetScore - currentScore;
        for (const diff of shuffleArray(['简单', '中等', '困难'])) {
          const pool = shuffleArray(availableQuestions.filter(q => q.difficulty === diff));
          for (const q of pool) {
            if (usedIdsThisPaper.has(q.id)) continue;
            if (q.score > remaining) continue;
            const rest = remaining - q.score;
            if (rest === 0) {
              tryAddQuestion(q);
              progress = true;
              break;
            }
            const canReach = availableQuestions.some(qq =>
              !usedIdsThisPaper.has(qq.id) && qq.id !== q.id && qq.score <= rest
            );
            if (canReach || rest < 3) {
              if (tryAddQuestion(q)) {
                progress = true;
                break;
              }
            }
          }
          if (currentScore === targetScore) break;
        }
        if (!progress) break;
      }
    }

    for (let swapAttempt = 0; swapAttempt < 150 && (currentScore !== targetScore || coveredKnowledge.size < knowledgeList.length); swapAttempt++) {
      let swapped = false;

      if (coveredKnowledge.size < knowledgeList.length) {
        const missingKP = knowledgeList.find(k => !coveredKnowledge.has(k));
        if (missingKP) {
          const candidates = shuffleArray(questionsByKnowledge[missingKP].filter(q =>
            !usedIdsThisPaper.has(q.id)
          ));
          for (const cand of candidates) {
            const replaceable = shuffleArray(currentPaper.filter(q =>
              q.score === cand.score ||
              (currentScore - q.score + cand.score <= targetScore)
            ));
            for (const r of replaceable) {
              const rKPs = r.knowledge.filter(k => knowledgeList.includes(k));
              const allRKPCovered = rKPs.every(k => (knowledgeQuestionCount[k] || 0) > 1);
              if (!allRKPCovered) continue;
              const newScore = currentScore - r.score + cand.score;
              if (newScore > targetScore) continue;
              const idx = currentPaper.findIndex(qq => qq.id === r.id);
              if (idx < 0) continue;
              currentPaper.splice(idx, 1);
              currentScore -= r.score;
              usedIdsThisPaper.delete(r.id);
              if (r.difficulty === '简单') simpleScore -= r.score;
              else if (r.difficulty === '中等') mediumScore -= r.score;
              else hardScore -= r.score;
              r.knowledge.forEach(k => {
                if (knowledgeList.includes(k)) {
                  knowledgeQuestionCount[k]--;
                  if (knowledgeQuestionCount[k] === 0) coveredKnowledge.delete(k);
                }
              });

              if (tryAddQuestion(cand)) {
                swapped = true;
                break;
              } else {
                currentPaper.splice(idx, 0, r);
                currentScore += r.score;
                usedIdsThisPaper.add(r.id);
                if (r.difficulty === '简单') simpleScore += r.score;
                else if (r.difficulty === '中等') mediumScore += r.score;
                else hardScore += r.score;
                r.knowledge.forEach(k => {
                  if (knowledgeList.includes(k)) {
                    knowledgeQuestionCount[k]++;
                    coveredKnowledge.add(k);
                  }
                });
              }
            }
            if (swapped) break;
          }
        }
      }

      if (!swapped && currentScore !== targetScore) {
        const gap = targetScore - currentScore;
        if (gap > 0) {
          const addPool = shuffleArray(availableQuestions.filter(q =>
            !usedIdsThisPaper.has(q.id) && q.score === gap
          ));
          for (const q of addPool) {
            if (tryAddQuestion(q)) { swapped = true; break; }
          }
          if (!swapped) {
            const swapPool = shuffleArray(currentPaper);
            for (const r of swapPool) {
              const newQPool = shuffleArray(availableQuestions.filter(q =>
                !usedIdsThisPaper.has(q.id) && q.score === r.score + gap
              ));
              for (const cand of newQPool) {
                const rKPs = r.knowledge.filter(k => knowledgeList.includes(k));
                const allRKPCovered = rKPs.every(k => (knowledgeQuestionCount[k] || 0) > 1);
                if (!allRKPCovered) continue;
                const idx = currentPaper.findIndex(qq => qq.id === r.id);
                currentPaper.splice(idx, 1);
                currentScore -= r.score;
                usedIdsThisPaper.delete(r.id);
                if (r.difficulty === '简单') simpleScore -= r.score;
                else if (r.difficulty === '中等') mediumScore -= r.score;
                else hardScore -= r.score;
                r.knowledge.forEach(k => {
                  if (knowledgeList.includes(k)) {
                    knowledgeQuestionCount[k]--;
                    if (knowledgeQuestionCount[k] === 0) coveredKnowledge.delete(k);
                  }
                });
                if (tryAddQuestion(cand)) {
                  swapped = true;
                  break;
                } else {
                  currentPaper.splice(idx, 0, r);
                  currentScore += r.score;
                  usedIdsThisPaper.add(r.id);
                  if (r.difficulty === '简单') simpleScore += r.score;
                  else if (r.difficulty === '中等') mediumScore += r.score;
                  else hardScore += r.score;
                  r.knowledge.forEach(k => {
                    if (knowledgeList.includes(k)) {
                      knowledgeQuestionCount[k]++;
                      coveredKnowledge.add(k);
                    }
                  });
                }
              }
              if (swapped) break;
            }
          }
        } else if (gap < 0) {
          const overflow = -gap;
          const swapPool = shuffleArray(currentPaper);
          for (const r of swapPool) {
            const newQPool = shuffleArray(availableQuestions.filter(q =>
              !usedIdsThisPaper.has(q.id) && q.score === r.score - overflow
            ));
            for (const cand of newQPool) {
              const rKPs = r.knowledge.filter(k => knowledgeList.includes(k));
              const allRKPCovered = rKPs.every(k => (knowledgeQuestionCount[k] || 0) > 1);
              if (!allRKPCovered) continue;
              const candAddsNewKP = cand.knowledge.some(k =>
                knowledgeList.includes(k) && !coveredKnowledge.has(k)
              );
              if (!candAddsNewKP && coveredKnowledge.size < knowledgeList.length) continue;
              const idx = currentPaper.findIndex(qq => qq.id === r.id);
              currentPaper.splice(idx, 1);
              currentScore -= r.score;
              usedIdsThisPaper.delete(r.id);
              if (r.difficulty === '简单') simpleScore -= r.score;
              else if (r.difficulty === '中等') mediumScore -= r.score;
              else hardScore -= r.score;
              r.knowledge.forEach(k => {
                if (knowledgeList.includes(k)) {
                  knowledgeQuestionCount[k]--;
                  if (knowledgeQuestionCount[k] === 0) coveredKnowledge.delete(k);
                }
              });
              if (tryAddQuestion(cand)) {
                swapped = true;
                break;
              } else {
                currentPaper.splice(idx, 0, r);
                currentScore += r.score;
                usedIdsThisPaper.add(r.id);
                if (r.difficulty === '简单') simpleScore += r.score;
                else if (r.difficulty === '中等') mediumScore += r.score;
                else hardScore += r.score;
                r.knowledge.forEach(k => {
                  if (knowledgeList.includes(k)) {
                    knowledgeQuestionCount[k]++;
                    coveredKnowledge.add(k);
                  }
                });
              }
            }
            if (swapped) break;
          }
        }
      }

      if (!swapped) break;
    }

    for (let tuneAttempt = 0; tuneAttempt < 200; tuneAttempt++) {
      const sr = simpleScore / Math.max(currentScore, 1);
      const mr = mediumScore / Math.max(currentScore, 1);
      const hr = hardScore / Math.max(currentScore, 1);
      const sDiff = sr - targetRatio.simple;
      const mDiff = mr - targetRatio.medium;
      const hDiff = hr - targetRatio.hard;
      const tolerance = 0.055;
      if (Math.abs(sDiff) <= tolerance && Math.abs(mDiff) <= tolerance && Math.abs(hDiff) <= tolerance) break;

      const overDiff = [['简单', sDiff], ['中等', mDiff], ['困难', hDiff]].sort((a, b) => b[1] - a[1])[0][0];
      const underDiff = [['简单', sDiff], ['中等', mDiff], ['困难', hDiff]].sort((a, b) => a[1] - b[1])[0][0];
      if (overDiff === underDiff) break;

      const overQs = shuffleArray(currentPaper.filter(q => q.difficulty === overDiff));
      let tuned = false;
      for (const r of overQs) {
        const rKPs = r.knowledge.filter(k => knowledgeList.includes(k));
        const allRKPCovered = rKPs.every(k => (knowledgeQuestionCount[k] || 0) > 1);
        if (!allRKPCovered) continue;

        const underCands = shuffleArray(availableQuestions.filter(q =>
          q.difficulty === underDiff &&
          !usedIdsThisPaper.has(q.id) &&
          q.score === r.score
        ));
        for (const cand of underCands) {
          const candKPs = cand.knowledge.filter(k => knowledgeList.includes(k));
          const noNewKP = candKPs.every(k => coveredKnowledge.has(k));
          if (!noNewKP && (knowledgeQuestionCount[candKPs[0]] === undefined)) {
          }
          const idx = currentPaper.findIndex(qq => qq.id === r.id);
          if (idx < 0) continue;
          currentPaper.splice(idx, 1);
          currentScore -= r.score;
          usedIdsThisPaper.delete(r.id);
          if (r.difficulty === '简单') simpleScore -= r.score;
          else if (r.difficulty === '中等') mediumScore -= r.score;
          else hardScore -= r.score;
          r.knowledge.forEach(k => {
            if (knowledgeList.includes(k)) {
              knowledgeQuestionCount[k]--;
              if (knowledgeQuestionCount[k] === 0) coveredKnowledge.delete(k);
            }
          });

          if (tryAddQuestion(cand)) {
            tuned = true;
            break;
          } else {
            currentPaper.splice(idx, 0, r);
            currentScore += r.score;
            usedIdsThisPaper.add(r.id);
            if (r.difficulty === '简单') simpleScore += r.score;
            else if (r.difficulty === '中等') mediumScore += r.score;
            else hardScore += r.score;
            r.knowledge.forEach(k => {
              if (knowledgeList.includes(k)) {
                knowledgeQuestionCount[k]++;
                coveredKnowledge.add(k);
              }
            });
          }
        }
        if (tuned) break;
      }
      if (!tuned) break;
    }

    const validation = validatePaper(currentPaper, targetScore, knowledgeList, targetRatio);
    if (validation.valid && currentScore === targetScore && coveredKnowledge.size === knowledgeList.length) {
      return {
        questions: currentPaper,
        totalScore: calculatePaperScore(currentPaper),
        coverage: calculateKnowledgeCoverage(currentPaper, knowledgeList),
        difficultyRatio: calculateDifficultyRatio(currentPaper),
        difficultyScoreRatio: calculateDifficultyScoreRatio(currentPaper),
        fitness: calculateFitness(currentPaper, targetScore, knowledgeList, targetRatio, knowledgeWeights),
        validationErrors: []
      };
    }

    const fitness = calculateFitness(currentPaper, targetScore, knowledgeList, targetRatio, knowledgeWeights);
    if (fitness > bestFitness) {
      bestFitness = fitness;
      bestPaper = [...currentPaper];
      bestErrors = validation.errors;
      if (currentScore !== targetScore) {
        if (!bestErrors.some(e => e.includes('总分'))) {
          bestErrors.push(`总分不达标：实际${currentScore}分`);
        }
      }
      if (coveredKnowledge.size < knowledgeList.length) {
        const miss = knowledgeList.filter(k => !coveredKnowledge.has(k));
        if (!bestErrors.some(e => e.includes('知识点'))) {
          bestErrors.push(`缺少知识点：${miss.join(',')}`);
        }
      }
    }
  }

  return {
    questions: bestPaper,
    totalScore: calculatePaperScore(bestPaper),
    coverage: calculateKnowledgeCoverage(bestPaper, knowledgeList),
    difficultyRatio: calculateDifficultyRatio(bestPaper),
    difficultyScoreRatio: calculateDifficultyScoreRatio(bestPaper),
    fitness: bestFitness,
    validationErrors: bestErrors.length > 0 ? bestErrors : validatePaper(bestPaper, targetScore, knowledgeList, targetRatio).errors
  };
}

function generatePapers(targetScore, knowledgeList, targetRatio, knowledgeWeights, count = 3) {
  const papers = [];
  const maxPaperAttempts = 2000;

  for (let i = 0; i < count; i++) {
    let paper = null;
    let paperAttempts = 0;
    let lastErrors = [];

    while (paperAttempts < maxPaperAttempts) {
      const candidate = generateSinglePaper(targetScore, knowledgeList, targetRatio, knowledgeWeights);
      paperAttempts++;
      lastErrors = candidate.validationErrors;

      if (candidate.validationErrors.length === 0 &&
          candidate.totalScore === targetScore &&
          candidate.coverage === 1) {
        paper = candidate;
        break;
      }
    }

    if (!paper) {
      throw new Error(
        `生成第${i + 1}套试卷时，经过${maxPaperAttempts}次尝试仍无法满足所有约束条件。` +
        (lastErrors.length > 0 ? `最后一次错误：${lastErrors.join('；')}` : '')
      );
    }

    papers.push(paper);
  }

  papers.sort((a, b) => b.fitness - a.fitness);
  return papers.map((p, idx) => ({
    id: idx + 1,
    ...p,
    coverage: (p.coverage * 100).toFixed(1) + '%',
    difficultyRatio: {
      simple: (p.difficultyScoreRatio.simple * 100).toFixed(1) + '%',
      medium: (p.difficultyScoreRatio.medium * 100).toFixed(1) + '%',
      hard: (p.difficultyScoreRatio.hard * 100).toFixed(1) + '%'
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
