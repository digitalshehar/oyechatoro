import { flatConfigs } from "eslint-config-next";

export default [
    ...flatConfigs.recommended,
    ...flatConfigs["core-web-vitals"],
];
