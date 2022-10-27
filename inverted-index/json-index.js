export default function createIndexJSON(data) {
  const indexedData = {};
  data.forEach((entry) => {
    entry.catch_phrase.split(" ").forEach((word) => {
      indexedData[word] ||= [];
      indexedData[word] = indexedData[word].concat([entry.id]);
    });
  });

  return Object.entries(indexedData);
}
