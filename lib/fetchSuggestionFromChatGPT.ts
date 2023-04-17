const fetchSuggestionFromChatGPT = () =>
  fetch("/api/suggestion", {
    cache: "no-cache",
  }).then((res) => res.json());

export default fetchSuggestionFromChatGPT;
