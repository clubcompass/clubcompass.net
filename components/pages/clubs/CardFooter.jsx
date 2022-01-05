import React from "react";
import { CCLink as Link } from "../../general/Link";
import { Button } from "../../general/Button";
export const CardFooter = ({ slug }) => (
  <div className="w-full flex flex-row justify-between">
    <Link slug={slug} />
    <Button />
  </div>
);
