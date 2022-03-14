import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createList, getLists, Path } from "../core/api";

export default function Main() {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const { data = [] } = useQuery(...getLists());

  const mutation = useMutation(...createList(), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(Path.LISTS);
    },
  });

  const addListHandler = () => {
    const title = inputRef.current?.value;
    if (!title) return;
    return mutation.mutate({ title });
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center text-white bg-slate-800">
      <h1 className="text-[3em] mb-5">Welcome to Nello!</h1>
      <div className="flex items-stretch h-[80%]">
        {data.map((d) => (
          <div className="flex flex-column justify-center self-start mr-2 h-7">
            <h2>{d.title}</h2>
          </div>
        ))}
        <div className="flex flex-column justify-start self-start">
          <input
            ref={inputRef}
            placeholder="List name"
            className="bg-transparent h-7 outline outline-1"
          />
          <button
            className="max-h-8 px-2 py-0.5 outline outline-1 rounded"
            onClick={addListHandler}
          >
            Add List
          </button>
        </div>
      </div>
    </div>
  );
}
