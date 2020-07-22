// @ts-nocheck
import { ApplyPluginsType } from '/Users/chenlong/Desktop/我的/td-antd-new/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"介绍","meta":{}},{"path":"/change-log","title":"更新日志","meta":{}},{"title":"Components","path":"/components","meta":{},"children":[{"path":"/components/desc-list","title":"DescList","meta":{}},{"path":"/components/drag-modal","title":"DragModal","meta":{}},{"path":"/components/empty-box","title":"EmptyBox","meta":{}},{"path":"/components/form-item","title":"FormItem","meta":{}},{"path":"/components/handle-box","title":"HandleBox","meta":{}},{"path":"/components/link-btn","title":"LinkBtn","meta":{}},{"path":"/components/modal-box","title":"ModalBox","meta":{}},{"path":"/components/popover-box","title":"PopoverBox","meta":{}},{"path":"/components/toast","title":"toast","meta":{}}]}]}},"locales":[],"navs":{},"title":"td-antd","logo":"/logo.png","desc":"基于antd封装的业务组件","mode":"doc","repoUrl":"https://github.com/long-zhuge/td-antd"},
      ...props,
    }),
    "routes": [
      {
        "path": "/components/desc-list",
        "component": require('../../components/desc-list/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/desc-list/index.md",
          "updatedTime": 1595403898877,
          "title": "DescList",
          "slugs": [
            {
              "depth": 2,
              "value": "DescList",
              "heading": "desclist"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "columns",
              "heading": "columns"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "DescList"
      },
      {
        "path": "/components/drag-modal",
        "component": require('../../components/drag-modal/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/drag-modal/index.md",
          "updatedTime": 1595401446625,
          "title": "DragModal",
          "slugs": [
            {
              "depth": 2,
              "value": "DragModal",
              "heading": "dragmodal"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "DragModal"
      },
      {
        "path": "/components/empty-box",
        "component": require('../../components/empty-box/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/empty-box/index.md",
          "updatedTime": 1595401446611,
          "title": "EmptyBox",
          "slugs": [
            {
              "depth": 2,
              "value": "EmptyBox",
              "heading": "emptybox"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "EmptyBox"
      },
      {
        "path": "/components/form-item",
        "component": require('../../components/form-item/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/form-item/index.md",
          "updatedTime": 1595404651224,
          "title": "FormItem",
          "slugs": [
            {
              "depth": 2,
              "value": "FormItem",
              "heading": "formitem"
            },
            {
              "depth": 3,
              "value": "基础表单",
              "heading": "基础表单"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "FormItem 包裹 Upload 时，非空不校验",
              "heading": "formitem-包裹-upload-时，非空不校验"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "FormItem"
      },
      {
        "path": "/components/handle-box",
        "component": require('../../components/handle-box/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/handle-box/index.md",
          "updatedTime": 1595403984154,
          "title": "HandleBox",
          "slugs": [
            {
              "depth": 2,
              "value": "HandleBox",
              "heading": "handlebox"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "HandleBox"
      },
      {
        "path": "/components/link-btn",
        "component": require('../../components/link-btn/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/link-btn/index.md",
          "updatedTime": 1595403967238,
          "title": "LinkBtn",
          "slugs": [
            {
              "depth": 2,
              "value": "LinkBtn",
              "heading": "linkbtn"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "LinkBtn"
      },
      {
        "path": "/components/modal-box",
        "component": require('../../components/modal-box/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/modal-box/index.md",
          "updatedTime": 1595404662101,
          "title": "ModalBox",
          "slugs": [
            {
              "depth": 2,
              "value": "ModalBox",
              "heading": "modalbox"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Ref",
              "heading": "ref"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "ModalBox"
      },
      {
        "path": "/components/popover-box",
        "component": require('../../components/popover-box/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/popover-box/index.md",
          "updatedTime": 1595404891409,
          "title": "PopoverBox",
          "slugs": [
            {
              "depth": 2,
              "value": "PopoverBox",
              "heading": "popoverbox"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Ref",
              "heading": "ref"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "PopoverBox"
      },
      {
        "path": "/components/toast",
        "component": require('../../components/toast/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/toast/index.md",
          "updatedTime": 1595405134195,
          "title": "toast",
          "slugs": [
            {
              "depth": 2,
              "value": "toast",
              "heading": "toast"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "toast"
      },
      {
        "path": "/change-log",
        "component": require('../../../docs/changeLog.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/changeLog.md",
          "updatedTime": 1595397391544,
          "title": "更新日志",
          "slugs": [
            {
              "depth": 2,
              "value": "更新日志",
              "heading": "更新日志"
            },
            {
              "depth": 4,
              "value": "🚀 1.6.8-bate2",
              "heading": "-168-bate2"
            },
            {
              "depth": 4,
              "value": "🚀 1.6.8-bate1",
              "heading": "-168-bate1"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.6",
              "heading": "-166"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.5",
              "heading": "-165"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.4",
              "heading": "-164"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.2",
              "heading": "-162"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.1",
              "heading": "-161"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0",
              "heading": "-160"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.15",
              "heading": "-160-beta15"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.13",
              "heading": "-160-beta13"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.12",
              "heading": "-160-beta12"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.11",
              "heading": "-160-beta11"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.10",
              "heading": "-160-beta10"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.8",
              "heading": "-160-beta8"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.7",
              "heading": "-160-beta7"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.6",
              "heading": "-160-beta6"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.5",
              "heading": "-160-beta5"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.4",
              "heading": "-160-beta4"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.3",
              "heading": "-160-beta3"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.2",
              "heading": "-160-beta2"
            },
            {
              "depth": 3,
              "value": "🚀 1.6.0-beta.1",
              "heading": "-160-beta1"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.8",
              "heading": "-158"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.7",
              "heading": "-157"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.5",
              "heading": "-155"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.4",
              "heading": "-154"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.3",
              "heading": "-153"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.2-beta.6",
              "heading": "-152-beta6"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.2-beta.4",
              "heading": "-152-beta4"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.2-beta.3",
              "heading": "-152-beta3"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.2-beta.1",
              "heading": "-152-beta1"
            },
            {
              "depth": 3,
              "value": "🚀 1.5.2-beta.0",
              "heading": "-152-beta0"
            },
            {
              "depth": 3,
              "value": "🚀 1.4.0",
              "heading": "-140"
            },
            {
              "depth": 3,
              "value": "🚀 1.3.12",
              "heading": "-1312"
            },
            {
              "depth": 3,
              "value": "🚀 1.3.10",
              "heading": "-1310"
            },
            {
              "depth": 3,
              "value": "🚀 1.3.4",
              "heading": "-134"
            },
            {
              "depth": 3,
              "value": "🚀 1.3.3",
              "heading": "-133"
            },
            {
              "depth": 3,
              "value": "🚀 1.3.2",
              "heading": "-132"
            },
            {
              "depth": 3,
              "value": "🚀 1.3.1",
              "heading": "-131"
            },
            {
              "depth": 3,
              "value": "🚀 1.3.0",
              "heading": "-130"
            },
            {
              "depth": 3,
              "value": "🚀 1.2.2",
              "heading": "-122"
            },
            {
              "depth": 3,
              "value": "🚀 1.2.1",
              "heading": "-121"
            },
            {
              "depth": 3,
              "value": "🚀 1.1.2",
              "heading": "-112"
            }
          ]
        },
        "title": "更新日志"
      },
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1595064507633,
          "title": "介绍",
          "slugs": [
            {
              "depth": 2,
              "value": "简介",
              "heading": "简介"
            },
            {
              "depth": 2,
              "value": "依赖",
              "heading": "依赖"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "使用组件",
              "heading": "使用组件"
            },
            {
              "depth": 2,
              "value": "按需加载",
              "heading": "按需加载"
            }
          ]
        },
        "title": "介绍"
      },
      {
        "path": "/components",
        "meta": {},
        "exact": true,
        "redirect": "/components/desc-list"
      }
    ],
    "title": "td-antd"
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
