import React from "react";
import Link from "next/link";
import { OnboardingFieldButton as Button } from "./input/OnboardingFieldButton";
export const Buttons = ({ buttons, asSubmission }) => {
  return (
    <div className="w-full col-span-6 max-w-[495px]">
      <div className="flex flex-row gap-2">
        {buttons.map((btn, index) => {
          if (btn.type === "link") {
            return (
              <Link href={btn.action} key={index}>
                <a className="w-full">
                  <Button primary={btn.primary} label={btn.label} />
                </a>
              </Link>
            );
          } else {
            return (
              <Button
                key={index}
                primary={btn.primary}
                label={btn.label}
                action={btn.action}
                disabled={btn.disabled}
                asSubmission={asSubmission}
                loading={btn.loading}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
