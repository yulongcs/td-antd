// @ts-nocheck
import { ApplyPluginsType } from '/Users/chenlong/Desktop/我的/td-antd-new/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"介绍","meta":{}},{"path":"/change-log","title":"更新日志","meta":{}},{"title":"Components","path":"/components","meta":{},"children":[{"path":"/components/auto-track","title":"autoTrack","meta":{}},{"path":"/components/desc-list","title":"DescList","meta":{}},{"path":"/components/drag-modal","title":"DragModal","meta":{}},{"path":"/components/empty-box","title":"EmptyBox","meta":{}},{"path":"/components/form-item","title":"FormItem","meta":{}},{"path":"/components/handle-box","title":"HandleBox","meta":{}},{"path":"/components/link-btn","title":"LinkBtn","meta":{}},{"path":"/components/modal-box","title":"ModalBox","meta":{}},{"path":"/components/popover-box","title":"PopoverBox","meta":{}},{"path":"/components/search-form","title":"SearchForm","meta":{}},{"path":"/components/select-map","title":"SelectMap","meta":{}},{"path":"/components/select-search","title":"SelectSearch","meta":{}},{"path":"/components/tag-addon","title":"TagAddon","meta":{}},{"path":"/components/td-input-number","title":"TdInputNumber","meta":{}},{"path":"/components/toast","title":"toast","meta":{}}]},{"title":"High-coupling","path":"/high-coupling","meta":{},"children":[{"path":"/high-coupling/local-config","title":"localConfig","meta":{}},{"path":"/high-coupling/login","title":"Login","meta":{}},{"path":"/high-coupling/pagination","title":"pagination","meta":{}},{"path":"/high-coupling/redirect","title":"redirect","meta":{}},{"path":"/high-coupling/table-page","title":"TablePage","meta":{}},{"path":"/high-coupling/td-upload","title":"TdUpload","meta":{}}]}]}},"locales":[],"navs":{},"title":"td-antd","logo":"/logo.png","desc":"基于antd封装的业务组件","mode":"doc","repoUrl":"https://github.com/long-zhuge/td-antd"},
      ...props,
    }),
    "routes": [
      {
        "path": "/components/auto-track",
        "component": require('../../components/auto-track/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/auto-track/index.md",
          "updatedTime": 1595412553000,
          "title": "autoTrack",
          "slugs": [
            {
              "depth": 2,
              "value": "autoTrack",
              "heading": "autotrack"
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
        "title": "autoTrack"
      },
      {
        "path": "/components/desc-list",
        "component": require('../../components/desc-list/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/desc-list/index.md",
          "updatedTime": 1595412553000,
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
          "updatedTime": 1595406105000,
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
          "updatedTime": 1595412553000,
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
          "updatedTime": 1595412553000,
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
          "updatedTime": 1595406105000,
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
          "updatedTime": 1595412553000,
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
          "updatedTime": 1595412553000,
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
          "updatedTime": 1595412553000,
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
        "path": "/components/search-form",
        "component": require('../../components/search-form/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/search-form/index.md",
          "updatedTime": 1595412553000,
          "title": "SearchForm",
          "slugs": [
            {
              "depth": 2,
              "value": "SearchForm",
              "heading": "searchform"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "ref",
              "heading": "ref"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "SearchForm"
      },
      {
        "path": "/components/select-map",
        "component": require('../../components/select-map/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/select-map/index.md",
          "updatedTime": 1595412553000,
          "title": "SelectMap",
          "slugs": [
            {
              "depth": 2,
              "value": "SelectMap",
              "heading": "selectmap"
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
        "title": "SelectMap"
      },
      {
        "path": "/components/select-search",
        "component": require('../../components/select-search/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/select-search/index.md",
          "updatedTime": 1595412553000,
          "title": "SelectSearch",
          "route": "/selectSearch",
          "menu": "组件",
          "slugs": [
            {
              "depth": 2,
              "value": "SelectSearch",
              "heading": "selectsearch"
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
        "title": "SelectSearch"
      },
      {
        "path": "/components/tag-addon",
        "component": require('../../components/tag-addon/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/tag-addon/index.md",
          "updatedTime": 1595412553000,
          "title": "TagAddon",
          "slugs": [
            {
              "depth": 2,
              "value": "TagAddon",
              "heading": "tagaddon"
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
        "title": "TagAddon"
      },
      {
        "path": "/components/td-input-number",
        "component": require('../../components/td-input-number/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/td-input-number/index.md",
          "updatedTime": 1595412553000,
          "title": "TdInputNumber",
          "slugs": [
            {
              "depth": 2,
              "value": "TdInputNumber",
              "heading": "tdinputnumber"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "支持的货币符号",
              "heading": "支持的货币符号"
            }
          ],
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "TdInputNumber"
      },
      {
        "path": "/components/toast",
        "component": require('../../components/toast/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/toast/index.md",
          "updatedTime": 1595412553000,
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
        "path": "/high-coupling/local-config",
        "component": require('../../highCoupling/local-config/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/highCoupling/local-config/index.md",
          "updatedTime": 1595412553000,
          "title": "localConfig",
          "slugs": [
            {
              "depth": 2,
              "value": "localConfig",
              "heading": "localconfig"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "config",
              "heading": "config"
            }
          ],
          "group": {
            "path": "/high-coupling",
            "title": "High-coupling"
          }
        },
        "title": "localConfig"
      },
      {
        "path": "/high-coupling/login",
        "component": require('../../highCoupling/login/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/highCoupling/login/index.md",
          "updatedTime": 1595412553000,
          "title": "Login",
          "slugs": [
            {
              "depth": 2,
              "value": "Login",
              "heading": "login"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Login.SignIn",
              "heading": "loginsignin"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api-1"
            },
            {
              "depth": 2,
              "value": "Login.SignUp",
              "heading": "loginsignup"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api-2"
            },
            {
              "depth": 2,
              "value": "Login.ResetPassword",
              "heading": "loginresetpassword"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api-3"
            }
          ],
          "group": {
            "path": "/high-coupling",
            "title": "High-coupling"
          }
        },
        "title": "Login"
      },
      {
        "path": "/high-coupling/pagination",
        "component": require('../../highCoupling/pagination/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/highCoupling/pagination/index.md",
          "updatedTime": 1595412553000,
          "title": "pagination",
          "slugs": [
            {
              "depth": 2,
              "value": "pagination",
              "heading": "pagination"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "group": {
            "path": "/high-coupling",
            "title": "High-coupling"
          }
        },
        "title": "pagination"
      },
      {
        "path": "/high-coupling/redirect",
        "component": require('../../highCoupling/redirect/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/highCoupling/redirect/index.md",
          "updatedTime": 1595412779390,
          "title": "redirect",
          "slugs": [
            {
              "depth": 2,
              "value": "redirect",
              "heading": "redirect"
            }
          ],
          "group": {
            "path": "/high-coupling",
            "title": "High-coupling"
          }
        },
        "title": "redirect"
      },
      {
        "path": "/high-coupling/table-page",
        "component": require('../../highCoupling/table-page/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/highCoupling/table-page/index.md",
          "updatedTime": 1595412915640,
          "title": "TablePage",
          "slugs": [
            {
              "depth": 2,
              "value": "TablePage",
              "heading": "tablepage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Ref，使用 ref.current 进行调用",
              "heading": "ref，使用-refcurrent-进行调用"
            }
          ],
          "group": {
            "path": "/high-coupling",
            "title": "High-coupling"
          }
        },
        "title": "TablePage"
      },
      {
        "path": "/high-coupling/td-upload",
        "component": require('../../highCoupling/td-upload/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/highCoupling/td-upload/index.md",
          "updatedTime": 1595412553000,
          "title": "TdUpload",
          "slugs": [
            {
              "depth": 2,
              "value": "TdUpload",
              "heading": "tdupload"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "callback",
              "heading": "callback"
            },
            {
              "depth": 3,
              "value": "Ref",
              "heading": "ref"
            },
            {
              "depth": 3,
              "value": "onInitialFiles(files, filterOptions)",
              "heading": "oninitialfilesfiles-filteroptions"
            },
            {
              "depth": 2,
              "value": "TdUpload.Preview",
              "heading": "tduploadpreview"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api-1"
            }
          ],
          "group": {
            "path": "/high-coupling",
            "title": "High-coupling"
          }
        },
        "title": "TdUpload"
      },
      {
        "path": "/change-log",
        "component": require('../../../docs/changeLog.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/changeLog.md",
          "updatedTime": 1595406105000,
          "title": "更新日志",
          "slugs": [
            {
              "depth": 2,
              "value": "更新日志",
              "heading": "更新日志"
            },
            {
              "depth": 4,
              "value": "🚀 1.6.8-bate4",
              "heading": "-168-bate4"
            },
            {
              "depth": 4,
              "value": "🚀 1.6.8-bate3",
              "heading": "-168-bate3"
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
          "updatedTime": 1595406105000,
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
        "redirect": "/components/auto-track"
      },
      {
        "path": "/high-coupling",
        "meta": {},
        "exact": true,
        "redirect": "/high-coupling/local-config"
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
