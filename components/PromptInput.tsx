function PromptInput() {
  return (
    <div className="m-5">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-600/10 border rounded-md lg:divide-x">
        <textarea className="flex-1 p-4 rounded-md outline-none" />
        <button>Generate</button>
        <button>Use Suggestion</button>
        <button>New Suggestion</button>
      </form>
    </div>
  );
}

export default PromptInput;
