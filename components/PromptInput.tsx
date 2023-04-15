"use client";
import { EventHandler, FormEvent, useState } from "react";
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
  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    const prompt = useSuggestion ? suggestion : inputPrompt;

    console.log(inputPrompt);

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await res.json();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  return (
    <div className="m-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-600/10 border rounded-md lg:divide-x"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 rounded-md outline-none"
          placeholder={
            loading
              ? "Getting a suggestion from ChatGPT..."
              : suggestion || "Enter a prompt..."
          }
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
          onClick={() => submitPrompt(true)}
          type="button"
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          onClick={mutate}
          className="p-4 bg-white text-violet-500 border-none rounded-b-md md:rounded-r-md md:rounded-bl-none transition-colors duration-200 font-bold "
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "Getting a suggestion from ChatGPT..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
