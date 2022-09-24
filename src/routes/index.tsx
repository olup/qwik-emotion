import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css, injectGlobal } from "@emotion/css";

injectGlobal`
  body {
    font-family: "Ibm Plex Mono"
  }`;

export default component$(() => {
  const state = useStore({
    size: 20,
  });

  return (
    <div>
      <h1
        className={css({
          fontWeight: 700,
        })}
        // As recommended by @emotion/css : dynamic styles should be added as inline "style" prop
        style={{ fontSize: state.size + "px" }}
      >
        Welcome to Qwik + Emotion demo
      </h1>
      <p>
        This is a simple demo of using emotion for styling with Qwik. I have no
        idea how this would scale.
      </p>
      <div
        className={css({
          border: "1px solid #eee",
          color: "#000",
          borderRadius: 5,
          display: "inline-flex",
          padding: "3px 10px",
          cursor: "pointer",
          userSelect: "none",
          "&:hover": {
            border: "1px solid #ccc",
          },
          "&:active": {
            border: "1px solid #aaa",
          },
        })}
        onClick$={() => state.size++}
      >
        + Bigger Title
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};
