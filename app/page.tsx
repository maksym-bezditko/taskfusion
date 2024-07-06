"use client";

import useClientStore from "@/hooks/useClientStore";
import { useBearStore } from "@/store/useBearStore";

export default function Home() {
  const { addABear, bears } = useClientStore(useBearStore, (state) => state);

  return (
    <div>
      <p>{bears}</p>

      <button onClick={addABear}>Add a bear</button>
    </div>
  );
}
