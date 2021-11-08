const generateRuleTests = require("ember-template-lint/lib/helpers/rule-test-harness");
const plugin = require("../../../ember-template-lint-plugin-prettier");

generateRuleTests({
  name: "prettier",

  groupMethodBefore: beforeEach,
  groupingMethod: describe,
  testMethod: it,
  plugins: [plugin],

  good: [
    ``,
    `{{! template-lint-disable prettier}}
{{#my-component}}

test

{{/my-component}}`,
    `{{! template-lint-disable }}
{{#my-component}}

test

{{/my-component}}`,
  ],

  bad: [
    {
      config: true,
      template: "{{#my-component}}{{/my-component}}\n",
      fixedTemplate: "{{#my-component}}{{/my-component}}",
      result: {
        message: "Delete `⏎`",
        line: 1,
        column: 34,
        endLine: 1,
        endColumn: 34,
        source: "{{#my-component}}{{/my-component}}\n",
        isFixable: true,
      },
    },
    {
      config: true,
      template: `<div data-foo
 data-bar="lol"
      some-other-thing={{haha-morethaneightychars}}>
</div>`,
      fixedTemplate: `<div data-foo data-bar="lol" some-other-thing={{haha-morethaneightychars}}>
</div>`,
      result: {
        message: 'Replace `⏎·data-bar="lol"⏎·····` with ` data-bar="lol"`',
        line: 1,
        column: 13,
        endLine: 1,
        endColumn: 13,
        source: `<div data-foo
 data-bar="lol"
      some-other-thing={{haha-morethaneightychars}}>
</div>`,
        isFixable: true,
      },
    },
    {
      config: true,
      template: "test\n",
      fixedTemplate: "test",
      result: {
        message: "Delete `⏎`",
        line: 1,
        column: 4,
        endLine: 1,
        endColumn: 4,
        source: "test\n",
        isFixable: true,
      },
    },
    {
      config: true,
      template: `{{#my-component}}

test

{{/my-component}}`,
      fixedTemplate: `{{#my-component}}

  test

{{/my-component}}`,
      result: {
        message: "Insert `··`",
        line: 2,
        column: 1,
        endLine: 2,
        endColumn: 1,
        source: "{{#my-component}}\n\ntest\n\n{{/my-component}}",
        isFixable: true,
      },
    },
    {
      config: true,
      template: `{{#my-component class="class1 class2"}}
  test 

{{/my-component}}`,
      fixedTemplate: `{{#my-component class="class1 class2"}}
  test

{{/my-component}}`,
      result: {
        message: "Delete `·`",
        line: 2,
        column: 6,
        endLine: 2,
        endColumn: 6,
        source:
          '{{#my-component class="class1 class2"}}\n  test \n\n{{/my-component}}',
        isFixable: true,
      },
    },
  ],
});
