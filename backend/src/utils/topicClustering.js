import natural from "natural";
import * as kmeans from "ml-kmeans";

export const clusterMentions = (mentions, numClusters = 3) => {
  if (!mentions.length) return mentions;

  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  mentions.forEach(m => tfidf.addDocument(m.text));

  const vectors = mentions.map((_, i) => {
    const obj = {};
    tfidf.listTerms(i).forEach(term => obj[term.term] = term.tfidf);
    return obj;
  });

  const allTerms = [...new Set(vectors.flatMap(v => Object.keys(v)))];
  const dataMatrix = vectors.map(v => allTerms.map(term => v[term] || 0));

  const clusters = kmeans.kmeans(dataMatrix, numClusters);

  return mentions.map((m, idx) => ({ ...m, topic: `Topic ${clusters.clusters[idx] + 1}` }));
};
