"use client"
import { AnimatedUnderlineLink } from "@/components/AnimatedUnderlineLink";
import { WiggleWiggle } from "@/components/WiggleWiggle";

const IndexPage = () => {
  return (
    <div className="bg-ctp-base flex min-h-screen flex-col items-center justify-center gap-8">
      <WiggleWiggle>
        <img
          src="/assets/icon.png"
          alt="Create Syl's App Logo"
          className="h-24 w-24"
        />
      </WiggleWiggle>
      <p>
        <strong className="text-2xl font-bold text-ctp-mauve">
          Welcome to your app!
        </strong>
      </p>
      <p>
        This app was bootstrapped with{" "}
        <code className="text-ctp-green">create-syl-app</code>.
      </p>
      <p>
        Edit <code className="text-ctp-green">src/app/layout.tsx</code> or{" "}
        <code className="text-ctp-green">src/app/page.tsx</code> to see your
        changes!
      </p>
      <p>
        For more information about adding routes and data handling, refer to
        both the{" "}
        <AnimatedUnderlineLink
          className="text-ctp-blue transition"
          href="https://nextjs.org/"
        >
          Next.js
        </AnimatedUnderlineLink>{" "}
        and{" "}
        <AnimatedUnderlineLink
          className="text-ctp-blue transition"
          href="https://tanstack.com/query"
        >
          TanStack Query
        </AnimatedUnderlineLink>{" "}
        docs.
      </p>
      <div className="flex flex-col items-center gap-1">
        <p>
          The boostrap includes{" "}
          <AnimatedUnderlineLink
            className="text-ctp-blue transition"
            href="https://orm.drizzle.team/"
          >
            Drizzle
          </AnimatedUnderlineLink>{" "}
          as an ORM. You may use any database service (including your own
          self-hosted) supported by Drizzle.
        </p>
        <p>
          A{" "}
          <AnimatedUnderlineLink
            className="text-ctp-blue transition"
            href="https://turso.tech/"
          >
            Turso
          </AnimatedUnderlineLink>{" "}
          (libsql) driver is included in the bootstrap and is recommended to be
          used.
        </p>
      </div>

      <p>
        For more information about what's included in the bootstrap, please see
        the repository{" "}
        <AnimatedUnderlineLink
          className="text-ctp-blue transition"
          href="https://github.com/NekoDrone/create-syl-app"
        >
          README
        </AnimatedUnderlineLink>
        .
      </p>

      <p>
        Built with 💜 by{" "}
        <AnimatedUnderlineLink
          className="text-ctp-blue transition"
          href="https://sylfr.dev"
        >
          Serenity
        </AnimatedUnderlineLink>
      </p>
    </div>
  );
};

export default IndexPage;
