"use client";
import { useState } from "react";
import useSWR from "swr";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";

function PromptInput() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });
  return (
    <div className="m-5">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-600/10 border rounded-md lg:divide-x">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 rounded-md outline-none"
          placeholder="Enter a prompt..."
        />
        <button
          disabled={!input}
          className={`p-4 font-bold ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed "
          }`}
          type="submit"
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-white text-violet-500 border-none rounded-b-md md:rounded-r-md md:rounded-bl-none transition-colors duration-200 font-bold "
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
