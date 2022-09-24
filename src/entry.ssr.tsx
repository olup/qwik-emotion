/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  RenderToStreamOptions,
  renderToString,
} from "@builder.io/qwik/server";
import { extractCritical } from "@emotion/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";

export default async function (opts: RenderToStreamOptions) {
  // render the app a first time as string
  const render = await renderToString(<Root />, { manifest, ...opts });
  // use @emotion/server to identify what styles should be extracted
  const { css } = extractCritical(render.html);

  // render the app a second time, with the styles injected
  const rdr = renderToStream(
    <Root
      emotionExtract={{
        css,
      }}
    />,
    {
      manifest,
      ...opts,

      prefetchStrategy: {
        implementation: {
          linkInsert: null,
          workerFetchInsert: null,
          prefetchEvent: "always",
        },
      },
    }
  );

  return rdr;
}
