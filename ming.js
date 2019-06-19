/**
 * @desc ming-ui.js
 * @author Quarter
 * @date 2019.04.25
 * @version 0.0.1
 */

(async function() {
  // 检测是否为 http 协议
  if (window.location.protocol.indexOf("http") == -1) {
    let info = {
      name: "ming.js",
      message:
        "Due to the use of dynamic loading, you must run the program on the server"
    };
    mError.apply(info, []);
    return false;
  }

  // 判断是否重复加载或定义
  if (
    window.customElements.get("m-select") ||
    window.customElements.get("m-option") ||
    window.customElements.get("m-input") ||
    window.customElements.get("m-file") ||
    window.customElements.get("m-date") ||
    window.customElements.get("m-color") ||
    window.customElements.get("m-switch") ||
    window.customElements.get("m-tag") ||
    window.customElements.get("m-form-item") ||
    window.customElements.get("m-operation-list") ||
    window.customElements.get("m-operation") ||
    window.customElements.get("m-function") ||
    window.customElements.get("m-icon-function") ||
    window.customElements.get("m-menu-item") ||
    window.customElements.get("m-menu-group") ||
    window.customElements.get("m-menu") ||
    window.customElements.get("m-table") ||
    window.customElements.get("m-simple-table") ||
    window.customElements.get("m-inner-cell")
  ) {
    return false;
  }

  // 引入必需的iconfont
  let url = "";
  let scriptArray = Array.from(document.querySelectorAll("script"));
  scriptArray.forEach(function(scriptNode) {
    let src = scriptNode.hasAttribute("src")
      ? scriptNode.getAttribute("src").toString()
      : "";
    if (new RegExp(/ming.js$/).test(src)) {
      url = src.replace("ming.js", "");
    }
  });

  // 同步加载依赖
  const syncLoadDependency = {
    getXmlHttpRequest: function() {
      //获取XMLHttpRequest对象(提供客户端同http服务器通讯的协议)
      if (window.XMLHttpRequest)
        // 除了IE外的其它浏览器
        return new XMLHttpRequest();
      else if (window.ActiveXObject)
        // IE
        return new ActiveXObject("MsXml2.XmlHttp");
    },
    createStyleElement: function(rootObject, fileUrl) {
      //导入文件
      if (rootObject != null) {
        let oStyle = document.createElement("style");
        oStyle.setAttribute("rel", "stylesheet");
        oStyle.setAttribute("type", "text/css");
        oStyle.setAttribute("href", fileUrl);
        rootObject.appendChild(oStyle);
      }
    },
    createStyleContent: function(rootObject, styleContent) {
      //导入文件
      if (rootObject != null) {
        let oStyle = document.createElement("style");
        oStyle.setAttribute("rel", "stylesheet");
        oStyle.setAttribute("type", "text/css");
        oStyle.innerHTML = styleContent;
        rootObject.appendChild(oStyle);
      }
    },
    createScriptElement: function(rootObject, fileUrl, thisObject) {
      //导入文件
      if (rootObject != null) {
        let oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = fileUrl;
        if (thisObject) {
          rootObject.insertBefore(oScript, thisObject);
        } else {
          rootObject.appendChild(oScript);
        }
      }
    },
    createScriptContent: function(rootObject, scriptContent) {
      //导入文件
      if (rootObject != null) {
        let oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.text = scriptContent;
        rootObject.appendChild(oScript);
      }
    },
    loadStyle: function(rootObject, url) {
      let self = this;
      let oXmlHttp = this.getXmlHttpRequest();
      oXmlHttp.onreadystatechange = function() {
        //其实当在第二次调用导入js时,因为在浏览器当中存在这个*.js文件了,它就不在访问服务器,也就不在执行这个方法了,这个方法也只有设置成异步时才用到
        if (oXmlHttp.readyState == 4) {
          //当执行完成以后(返回了响应)所要执行的
          if (oXmlHttp.status == 200 || oXmlHttp.status == 304) {
            //200有读取对应的url文件,404表示不存在这个文件
            // self.createStyleElement(rootObject, url);
            self.createStyleContent(rootObject, oXmlHttp.responseText);
          } else {
            let info = {
              name: "syncLoadDependency",
              message: `request error <(${oXmlHttp.status})${
                oXmlHttp.statusText
              }>`
            };
            mError.apply(info);
          }
        }
      };

      oXmlHttp.open("GET", url, false);
      oXmlHttp.send(null);
    },
    loadScript: function(rootObject, url) {
      let self = this;
      let oXmlHttp = this.getXmlHttpRequest();
      oXmlHttp.onreadystatechange = function() {
        //其实当在第二次调用导入js时,因为在浏览器当中存在这个*.js文件了,它就不在访问服务器,也就不在执行这个方法了,这个方法也只有设置成异步时才用到
        if (oXmlHttp.readyState == 4) {
          //当执行完成以后(返回了响应)所要执行的
          if (oXmlHttp.status == 200 || oXmlHttp.status == 304) {
            //200有读取对应的url文件,404表示不存在这个文件
            // self.createScriptElement(rootObject, url);
            self.createScriptContent(rootObject, oXmlHttp.responseText);
          } else {
            let info = {
              name: "syncLoadDependency",
              message: `request error <(${oXmlHttp.status})${
                oXmlHttp.statusText
              }>`
            };
            mError.apply(info);
          }
        }
      };

      oXmlHttp.open("GET", url, false);
      oXmlHttp.send(null);
    }
  };

  // 获取相对路径
  let heads = document.getElementsByTagName("head");
  if (heads.length) {
    syncLoadDependency.loadStyle(heads[0], `${url}ming.css`);
    syncLoadDependency.loadStyle(heads[0], `${url}iconfont/iconfont.css`);
  } else {
    syncLoadDependency.loadStyle(document.documentElement, `${url}ming.css`);
    syncLoadDependency.loadStyle(
      document.documentElement,
      `${url}iconfont/iconfont.css`
    );
  }
  // 引入fly.js
  let body = document.getElementsByTagName("body");
  if (body.length) {
    syncLoadDependency.loadScript(body[0], `${url}fly/fly.min.js`);
  } else {
    syncLoadDependency.loadScript(
      document.documentElement,
      `${url}fly/fly.min.js`
    );
  }

  let MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  // 获取浏览器滚动条的宽度
  function getScrollBarWidth() {
    let ele = document.createElement("p"),
      styles = {
        width: "100px",
        height: "100px",
        overflowY: "scroll"
      };
    for (let i in styles) {
      ele.style[i] = styles[i];
    }
    document.body.appendChild(ele);
    let scrollBarWidth = ele.offsetWidth - ele.clientWidth;
    //将添加的元素删除
    ele.remove();
    return scrollBarWidth;
  }
  const browerScrollBarWidth = getScrollBarWidth();

  // 自定义异常输出方式
  function mError() {
    let paramStr = "";
    for (let i = 0, len = arguments.length; i < len; i++) {
      paramStr += `, arguments[${i}]`;
    }
    eval(
      `console.error('%cerror', 'color:#b7282e', '${
        this.name
      }:', this.message${paramStr})`
    );
  }

  function mWarn() {
    let paramStr = "";
    for (let i = 0, len = arguments.length; i < len; i++) {
      paramStr += `, arguments[${i}]`;
    }
    eval(
      `console.warn('%cwarn', 'color:#ee7948', '${
        this.name
      }:', this.message${paramStr})`
    );
  }

  // 平滑滚动
  const ScrollTop = (obj, number = 0, time, bar) => {
    if (!time) {
      obj.scrollTop = number;
      if (bar)
        bar.style.top =
          (number / (obj.scrollHeight - obj.clientHeight)) *
            (obj.clientHeight - bar.clientHeight) +
          "px";
      return number;
    }
    const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime; // 计算循环的次数
    let nowTop = obj.scrollTop; // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
      if (spacingInex > 0) {
        spacingInex--;
        ScrollTop(obj, (nowTop += everTop), null, bar);
      } else {
        clearInterval(scrollTimer); // 清除计时器
      }
    }, spacingTime);
  };

  // 顺序递归向目标元素插入script
  function insertScript(scriptStrList, obj) {
    if (Array.isArray(scriptStrList) && scriptStrList.length) {
      let scriptItem = scriptStrList[0];
      let scriptEle = document.createElement("script");
      let src = scriptItem.match(new RegExp(/src="[^>]*"/g));
      let content = scriptItem
        .replace(/<script[^>]*>/g, "")
        .replace("</script>", "");
      scriptEle.setAttribute("type", "text/javascript");
      if (src && src[0]) {
        scriptEle.setAttribute(
          "src",
          src[0].replace('src="', "").replace('"', "")
        );
      }
      if (content) {
        scriptEle.text = content;
      }
      obj.appendChild(scriptEle);
      if (scriptEle.readyState) {
        // ie中的准备状态
        scriptEle.onreadystatechange = function() {
          if (
            scriptEle.readyState == "loaded" ||
            scriptEle.readyState == "complete"
          ) {
            scriptEle.onreadystatechange = null;
            scriptStrList.splice(0, 1);
            insertScript(scriptStrList, obj);
          }
        };
      } else {
        // 非 ie 浏览器
        scriptEle.onload = function() {
          scriptStrList.splice(0, 1);
          insertScript(scriptStrList, obj);
        };
      }
    }
  }

  // 校验表格配置
  function verifyTableConfig(config) {
    let param = {
      container: this, // 容器
      config: config, // 配置文件
      nodeName: this.nodeName.toLowerCase() // 标签名
    };
    if (
      param.container.nodeName != "M-TABLE" &&
      param.container.nodeName != "M-SIMPLE-TABLE"
    ) {
      // 容器为非m-table标签
      let info = {
        name: param.nodeName,
        message: `table container <${param.selector}> is not a ${
          param.nodeName
        }`
      };
      mError.apply(info);
      param.container.showError();
      return false;
    }
    if (!param.config) {
      // 未给定配置信息
      let info = {
        name: param.nodeName,
        message: `not specify table config yet`
      };
      mError.apply(info);
      param.container.showError();
      return false;
    }
    if (!param.config.data) {
      let info = {
        name: param.nodeName,
        message: `not specify table data get method`
      };
      mError.apply(info);
      param.container.showError();
      return false;
    }
    param.columns = config.columns || []; // 表格单元格配置
    if (!param.columns) {
      // 尚未给出columns配置
      let info = {
        name: param.nodeName,
        message: `table column is not specified`
      };
      mError.apply(info, [param.columns]);
      param.container.showError();
      return false;
    } else {
      if (!Array.isArray(param.columns)) {
        // columns为非数组
        let info = {
          name: param.nodeName,
          message: `table column should be an array`
        };
        mError.apply(info, [param.columns]);
        param.container.showError();
        return false;
      }
      if (param.columns.length == 0) {
        // columns数组为空
        let info = {
          name: param.nodeName,
          message: `table column should not be empty`
        };
        mError.apply(info, [param.columns]);
        param.container.showError();
        return false;
      }
      let columnsCheck = false; // columns元素为非object
      param.columns.forEach(function(item) {
        if (!typeof item == "object") {
          columnsCheck = true;
        }
      });
      if (columnsCheck) {
        let info = {
          name: param.nodeName,
          message: `table column item should be array or object`
        };
        mError.apply(info, [param.columns]);
        param.container.showError();
        return false;
      }
      if (Array.isArray(param.columns[0])) {
        // columns内的元素为数组
        columnsCheck = false; // columns元素为非object
        param.columns.forEach(function(item) {
          if (!Array.isArray(item)) {
            columnsCheck = true;
          }
        });
        if (columnsCheck) {
          let info = {
            name: param.nodeName,
            message: `all table column items should be array`
          };
          mError.apply(info, [param.columns]);
          param.container.showError();
          return false;
        }
      } else {
        columnsCheck = false; // columns元素为非object
        param.columns.forEach(function(item) {
          if (Object.prototype.toString.call(item) != "[object Object]") {
            columnsCheck = true;
          }
        });
        if (columnsCheck) {
          let info = {
            name: param.nodeName,
            message: `all table column items should be object`
          };
          mError.apply(info, [param.columns]);
          param.container.showError();
          return false;
        }
      }
    }
    return true;
  }

  // 动态表格生成
  function configMingTable(config) {
    let param = {
      container: this, // 容器
      config: config // 配置文件
    };

    if (!verifyTableConfig.call(param.container, config)) {
      return false;
    }

    delete param.container.config;
    delete param.container.renderList;
    param.pageSize = config.pageSize || 10; // 分页大小
    param.pageNumber = config.pageNumber || 1; // 分页页码
    param.container.innerHTML = "";
    param.tableHeader = "";
    param.fixedTableHeader = "";
    param.renderList = new Array(); // 渲染列表
    param.renderGrid = new Array(); // 渲染列表用网格
    param.columns = param.config.columns || []; // 表格单元格配置
    if (!Array.isArray(param.columns[0])) {
      param.columns = [param.columns];
    }
    try {
      let renderGridItem = new Array();
      param.columns[0].forEach(function(item) {
        // 按行解析
        let num = parseInt(item.colspan) || 1;
        for (let i = 0; i < num; i++) {
          renderGridItem.push({});
        }
      });
      for (let i = 0; i < param.columns.length; i++) {
        param.renderGrid.push(Array.from(renderGridItem));
      }
      param.columns.forEach(function(row, rowIndex) {
        let i = 0;
        row.forEach(function(column, colIndex) {
          let colSpan = parseInt(column.colspan || 0) || 1;
          let rowSpan = parseInt(column.rowspan || 0) || 1;
          if (colSpan > 1) {
            // 去除合并元素
            for (let k = i + 1; k < i + colSpan; k++) {
              param.renderGrid[rowIndex][k] = false;
            }
          }
          if (rowSpan > 1) {
            for (let k = rowIndex + 1; k < rowIndex + rowSpan; k++) {
              param.renderGrid[k][i] = false;
            }
          }
          i += colSpan;
        });
      });
    } catch (e) {
      let info = {
        name: param.nodeName,
        message: `table column parsing failure`
      };
      mError.apply(info, [param.columns, e]);
      param.container.showError();
      return false;
    }
    try {
      param.columns.forEach(function(row, rowIndex) {
        // 按行解析
        let i = 0;
        let tableHeaderRow = "";
        let fixedTableHeaderRow = "";
        row.forEach(function(column, colIndex) {
          // 按列解析
          while (
            param.renderGrid[rowIndex][i] === false &&
            i < param.renderGrid[rowIndex].length
          ) {
            i++;
          }
          if (column.field || column.formatter || column.fixed) {
            param.renderGrid[rowIndex][i].field = column.field;
            param.renderGrid[rowIndex][i].width = column.width || null;
            param.renderGrid[rowIndex][i].align = column.align || "left";
            param.renderGrid[rowIndex][i].valign = column.valign || "middle";
            param.renderGrid[rowIndex][i].formatter = column.formatter;
            param.renderGrid[rowIndex][i].fixed = !!column.fixed;
          }
          let columnHtml =
            `<th` +
            ` col-index="c${i}"` +
            ` class="${column.fixed ? " fixed-column" : ""}` +
            `${i == 0 ? " border-left-column" : ""}` +
            `${
              i == param.renderGrid[rowIndex].length - 1
                ? " border-right-column"
                : ""
            }"` +
            `${column.colspan ? ' colspan="' + column.colspan + '"' : ""}` +
            `${column.rowspan ? ' rowspan="' + column.rowspan + '"' : ""}` +
            `${
              column.align ? ' align="' + column.align + '"' : ' align="left"'
            }` +
            `${
              column.valign
                ? ' valign="' + column.valign + '"'
                : ' valign="middle"'
            }` +
            `${column.width ? ' width="' + column.width + '"' : ""}` +
            `><div class="inner-cell">${column.title || ""}</div></th>`;
          if (tableHeaderRow == "") {
            tableHeaderRow += `<tr row-index="r${rowIndex}">`;
          }
          tableHeaderRow += columnHtml;
          if (!!column.fixed) {
            if (fixedTableHeaderRow == "") {
              fixedTableHeaderRow += `<tr row-index="r${rowIndex}">`;
            }
            fixedTableHeaderRow += columnHtml;
          }
          i += 1;
        });
        if (tableHeaderRow != "") {
          tableHeaderRow += "</tr>";
          param.tableHeader += tableHeaderRow;
        }
        if (fixedTableHeaderRow != "") {
          fixedTableHeaderRow += "</tr>";
          param.fixedTableHeader += fixedTableHeaderRow;
        }
      });
      param.renderGrid[0].forEach(function(column, colIndex) {
        for (let i = param.renderGrid.length - 1; i >= 0; i--) {
          if (param.renderGrid[i][colIndex] !== false) {
            param.renderList.push(param.renderGrid[i][colIndex]);
            break;
          }
        }
      });
      this.renderList = param.renderList;
      let emptyTr = '<tr row-index="r-1">';
      let emptyFixedTr = '<tr row-index="r-1">';
      param.renderList.forEach(function(item, index) {
        emptyTr +=
          `<th col-index="c${index}"` +
          `${index == 0 ? ' class="border-left-column"' : ""}` +
          `${
            index == param.renderList.length - 1
              ? ' class="border-right-column"'
              : ""
          }></th>`;
        if (item.fixed) {
          emptyFixedTr += `<th col-index="c${index}"></th>`;
        }
      });
      emptyTr += "</tr>";
      emptyFixedTr += "</tr>";
      param.tableHeader = emptyTr + param.tableHeader;
      param.fixedTableHeader = emptyFixedTr + param.fixedTableHeader;
      if (param.tableHeader != "") {
        let mainTableHeader = document.createElement("table");
        mainTableHeader.setAttribute("slot", "main-table-header");
        mainTableHeader.setAttribute("cellspacing", "0");
        mainTableHeader.classList.add("m-table-main-header");
        param.container.appendChild(mainTableHeader);
        mainTableHeader.innerHTML = param.tableHeader;
      }
      if (
        param.fixedTableHeader != "" &&
        param.container.nodeName == "M-TABLE"
      ) {
        let fixedTableHeader = document.createElement("table");
        fixedTableHeader.setAttribute("slot", "fixed-table-header");
        fixedTableHeader.setAttribute("cellspacing", "0");
        fixedTableHeader.setAttribute("show", "0");
        fixedTableHeader.classList.add("m-table-fixed-header");
        param.container.appendChild(fixedTableHeader);
        fixedTableHeader.innerHTML = param.fixedTableHeader;
      }
      let tableParam = {
        pageSize: param.pageSize,
        pageNumber: param.pageNumber,
        data: param.config.data,
        pageTypeIcon: param.config.pageTypeIcon || false
      };
      if (param.config.success && typeof param.config.success == "function") {
        tableParam.success = param.config.success;
      }
      if (param.config.error && typeof param.config.error == "function") {
        tableParam.error = param.config.error;
      }
      param.container.config = tableParam;
      let mainTableBody = document.createElement("table");
      mainTableBody.setAttribute("slot", "main-table");
      mainTableBody.setAttribute("cellspacing", "0");
      mainTableBody.classList.add("m-table-main-body");
      param.container.appendChild(mainTableBody);
      if (param.container.nodeName == "M-TABLE") {
        let fixedTableBody = document.createElement("table");
        fixedTableBody.setAttribute("slot", "fixed-table");
        fixedTableBody.setAttribute("cellspacing", "0");
        fixedTableBody.classList.add("m-table-fixed-body");
        param.container.appendChild(fixedTableBody);
      }
      let pageContainer = document.createElement("ul");
      pageContainer.setAttribute("slot", "table-footer");
      pageContainer.classList.add("m-table-footer");
      param.container.appendChild(pageContainer);
      pageContainer.addEventListener("click", function(e) {
        let node = e.target;
        if (e.target.nodeName == "I") {
          node = node.parentNode;
        }
        if ((node.nodeName = "LI" && node.hasAttribute("action-target"))) {
          if (node.classList.contains("disabled")) {
            return true;
          }
          let target = node.getAttribute("action-target");
          switch (target) {
            case "first-page": // 首页
              param.container.config.pageNumber = 1;
              param.container.render();
              break;
            case "previous-page":
              param.container.config.pageNumber -= 1;
              param.container.render();
              break;
            case "change-page":
              if (!node.classList.contains("active")) {
                let page = parseInt(node.innerText);
                if (page >= 1 && page <= param.container.config.maxPageNumber) {
                  param.container.config.pageNumber = page;
                  param.container.render();
                }
              }
              break;
            case "next-page":
              param.container.config.pageNumber += 1;
              param.container.render();
              break;
            case "last-page":
              param.container.config.pageNumber =
                param.container.config.maxPageNumber;
              param.container.render();
              break;
            default:
          }
        }
      });
    } catch (e) {
      let info = {
        name: "m-table",
        message: `table column parsing failure`
      };
      mError.apply(info, [param.columns, e]);
      param.container.showError();
      return false;
    }
    this.render();
  }

  // 动态渲染表格
  async function renderMingTable() {
    let param = {
      container: this, // 容器
      tableData: this.config.data, // 表格数据
      renderList: this.renderList, // 渲染列表
      config: this.config // 配置信息
    };
    param.container.hideError();
    param.container.hideEmpty();
    if (typeof param.tableData == "function") {
      try {
        param.tableData = await eval("this.config.data.call(param.container)");
      } catch (e) {
        if (param.config.error && typeof param.config.error == "function") {
          eval(`param.config.error(param.container, param.tableData)`);
        }
        param.container.showEmpty();
        // 动态计算宽高度
        setTimeout(function() {
          syncFixedTable.call(param.container);
        }, 0);
        throw e;
      }
    }
    if (!param.renderList || !param.config) {
      // 验证组件是否已经注册
      let info = {
        name: "m-table",
        message: `you should config this component first`
      };
      mError.apply(info, [param.container]);
      return false;
    }
    if (Object.prototype.toString.call(param.tableData) != "[object Object]") {
      // 验证数据格式是否正确
      let info = {
        name: "m-table",
        message: `table data must be the following data format`
      };
      let dataExample = {
        status: 200,
        total: 100,
        data: []
      };
      mError.apply(info, [dataExample, data]);
      return false;
    }
    if (param.tableData.status == 200) {
      if (!param.tableData.data || param.tableData.data.length == 0) {
        param.container.showEmpty();
      }
      try {
        let thVisableNodes = Array.from(
          param.container.querySelectorAll(
            ".m-table-main-header tr:first-of-type th"
          )
        );
        thVisableNodes.forEach(function(thVisableNode) {
          thVisableNode.style.width = null;
        });
      } catch (e) {
        let info = {
          name: "m-table",
          message: `reset table header style failure`
        };
        mError.apply(info, [e]);
        param.container.showError();
        return false;
      }
      try {
        let mainTableBody = param.container.querySelector(".m-table-main-body");
        let fixedTableBody = null;
        mainTableBody.innerHTML = "";
        if (param.container.nodeName == "M-TABLE") {
          fixedTableBody = param.container.querySelector(".m-table-fixed-body");
          fixedTableBody.innerHTML = "";
        }
        param.tableData.data.forEach(function(row, rowIndex) {
          // 按行解析
          if (rowIndex >= param.config.pageSize) {
            return false;
          }
          let mainRow = document.createElement("tr");
          mainRow.setAttribute("row-index", "r" + rowIndex);
          let fixedRow = null;
          if (param.container.nodeName == "M-TABLE") {
            fixedRow = document.createElement("tr");
            fixedRow.setAttribute("row-index", "r" + rowIndex);
          }
          param.renderList.forEach(function(column, colIndex) {
            // 按解析列表解析列
            let columnValue = row[column.field] || "-";
            if (column.formatter) {
              // 如果存在自定义数据格式化
              columnValue = eval(
                `column.formatter(columnValue, row.${column.field}, rowIndex)`
              );
            }
            let mainColumn = document.createElement("td");
            mainColumn.setAttribute("col-index", "c" + colIndex);
            if (param.container.nodeName == "M-TABLE") {
              if (column.fixed) mainColumn.classList.add("fixed-column");
            }
            mainColumn.setAttribute("align", column.align);
            mainColumn.setAttribute("valign", column.valign);
            mainColumn.innerHTML = `<m-inner-cell class="inner-cell">${columnValue}</m-inner-cell>`;
            mainColumn.querySelector("m-inner-cell.inner-cell").dataSet = {
              row: row,
              column: columnValue,
              rowIndex: rowIndex,
              colIndex: colIndex
            };
            mainRow.appendChild(mainColumn);
            mainRow.dataset = new Object({
              row: row,
              column: columnValue,
              rowIndex: rowIndex,
              colIndex: colIndex
            }).toString();
            if (param.container.nodeName == "M-TABLE") {
              if (column.fixed) {
                let fixedColumn = document.createElement("td");
                fixedColumn.setAttribute("col-index", "c" + colIndex);
                if (rowIndex == 0)
                  fixedColumn.setAttribute("align", column.align);
                if (rowIndex == 0)
                  fixedColumn.setAttribute("valign", column.valign);
                fixedColumn.innerHTML = `<m-inner-cell class="inner-cell">${columnValue}</m-inner-cell>`;
                fixedColumn.querySelector("m-inner-cell.inner-cell").dataSet = {
                  row: row,
                  column: columnValue,
                  rowIndex: rowIndex,
                  colIndex: colIndex
                };
                fixedRow.appendChild(fixedColumn);
              }
            }
          });
          mainTableBody.appendChild(mainRow);
          if (param.container.nodeName == "M-TABLE") {
            fixedTableBody.appendChild(fixedRow);
          }
        });
      } catch (e) {
        let info = {
          name: param.container.nodeName.toLowerCase(),
          message: `table data parsing failure`
        };
        mError.apply(info, [param.tableData, e]);
        param.container.showError();
        return false;
      }
      try {
        let currentPage = param.config.pageNumber;
        let pageSize = param.config.pageSize;
        let maxPage = Math.ceil(param.tableData.total / pageSize);
        param.container.config.maxPageNumber = maxPage;
        let firstStatus = currentPage <= 1;
        let lastStatus = currentPage >= maxPage;
        let pageTypeIcon = param.config.pageTypeIcon;
        let pageSelector = new Array();
        pageSelector.push({
          disable: firstStatus,
          active: false,
          target: "first-page",
          value: pageTypeIcon
            ? '<i class="m-iconfont ming-icon-first"></i>'
            : "首页"
        });
        pageSelector.push({
          disable: firstStatus,
          active: false,
          target: "previous-page",
          value: pageTypeIcon
            ? '<i class="m-iconfont ming-icon-previous"></i>'
            : "上一页"
        });
        if (currentPage - 2 >= 1) {
          pageSelector.push({
            disable: false,
            active: false,
            target: "change-page",
            value: currentPage - 2
          });
        }
        if (currentPage - 1 >= 1) {
          pageSelector.push({
            disable: false,
            active: false,
            target: "change-page",
            value: currentPage - 1
          });
        }
        pageSelector.push({
          disable: false,
          active: true,
          target: "change-page",
          value: currentPage
        });
        let nextStep = 1;
        while (pageSelector.length < 7 && currentPage + nextStep <= maxPage) {
          pageSelector.push({
            disable: false,
            active: false,
            target: "change-page",
            value: currentPage + nextStep
          });
          nextStep++;
        }
        pageSelector.push({
          disable: lastStatus,
          active: false,
          target: "next-page",
          value: pageTypeIcon
            ? '<i class="m-iconfont ming-icon-next"></i>'
            : "下一页"
        });
        pageSelector.push({
          disable: lastStatus,
          active: false,
          target: "last-page",
          value: pageTypeIcon
            ? '<i class="m-iconfont ming-icon-last"></i>'
            : "尾页"
        });
        let pageContainer = param.container.querySelector(".m-table-footer");
        pageContainer.innerHTML = "";
        pageSelector.forEach(function(selector) {
          let slt = document.createElement("li");
          if (selector.disable) slt.classList.add("disabled");
          if (selector.active) slt.classList.add("active");
          if (selector.target)
            slt.setAttribute("action-target", selector.target);
          slt.innerHTML = selector.value;
          pageContainer.appendChild(slt);
        });
      } catch (e) {
        let info = {
          name: "m-table",
          message: `table page parsing failure`
        };
        mError.apply(info, [param.tableData, e]);
        param.container.showError();
        return false;
      }
      if (param.config.success && typeof param.config.success == "function") {
        eval(`param.config.success(param.container, param.tableData)`);
      }
    } else {
      if (param.config.empty && typeof param.config.empty == "function") {
        eval(`param.config.empty(param.container, param.tableData)`);
      }
      param.container.showEmpty();
    }
    try {
      // 动态计算宽高度
      setTimeout(function() {
        syncFixedTable.call(param.container);
      }, 0);
    } catch (e) {
      let info = {
        name: "m-table",
        message: `dynamic layout error`
      };
      mError.apply(info, [e]);
      param.container.showError();
      return false;
    }
  }

  // 同步固定表格头的高度
  function syncFixedTable() {
    let container = this;
    let tableBody = container.shadowRoot.querySelector(".table-body");
    let fixedBody = container.shadowRoot.querySelector(".fixed-body");
    let mainHeader = container.shadowRoot.querySelector(".table-header");
    let fixedHeader = container.shadowRoot.querySelector(".fixed-table-header");
    let mainBody = container.shadowRoot.querySelector(".table-main");
    let fixedTable = container.shadowRoot.querySelector(".fixed-table");
    let tableFooter = container.shadowRoot.querySelector(".table-footer");
    try {
      if (!tableBody.style.minWidth) {
        tableBody.style.maxWidth = container.clientWidth + "px";
      }
      container.style.padding = "0 !important";
      let containerHeight = container.clientHeight;
      let containerbodyHeight = containerHeight - tableFooter.offsetHeight;
      let tableHeaderHeight = mainHeader.offsetHeight;
      let tableBodyHeight = containerbodyHeight - tableHeaderHeight;
      if (
        tableBody.style.height ||
        container.clientHeight >
          tableBody.offsetHeight + tableFooter.offsetHeight ||
        tableBody.scrollHeight > tableBody.offsetHeight
      ) {
        // 校准表格容器高度
        tableBody.style.height = containerbodyHeight + "px";
        let widthScroll = false;
        if (tableBody.clientWidth < tableBody.scrollWidth) {
          widthScroll = true;
        }
        if (container.nodeName == "M-TABLE") {
          fixedBody.style.height =
            containerbodyHeight -
            (widthScroll ? browerScrollBarWidth : 0) +
            "px";
        }
        // 校准表格主体高度
        mainBody.style.height =
          tableBodyHeight - (widthScroll ? browerScrollBarWidth : 0) + "px";
        if (container.nodeName == "M-TABLE") {
          fixedTable.style.height =
            tableBodyHeight - (widthScroll ? browerScrollBarWidth : 0) + "px";
        }
      }
      container.style.padding = false;
    } catch (e) {
      let info = {
        name: "m-table",
        message: "calc table body size fail"
      };
      mError.apply(info, [e]);
    }
    if (
      container.config == undefined ||
      container.config.error ||
      container.config.empty
    ) {
      return false;
    }
    if (
      container.nodeName == "M-TABLE" &&
      !container.querySelector(".m-table-fixed-header") &&
      !container.querySelector(".m-table-fixed-body")
    ) {
      return false;
    }
    try {
      let renderList = container.renderList;
      renderList.forEach(function(item, index) {
        let thNodes = Array.from(
          container
            .querySelector(".m-table-main-header")
            .querySelectorAll(`th[col-index=c${index}]`)
        );
        let thNode = thNodes ? thNodes[thNodes.length - 1] : null; // 标题node
        let thFirstNode = thNodes ? thNodes[0] : null; // 标题node
        let tdNode = container
          .querySelector(".m-table-main-body tr[row-index=r0]")
          .querySelector(`td[col-index=c${index}]`);
        if (thFirstNode && thNode && tdNode) {
          if (thFirstNode.style.width && tdNode.style.width) {
            return false;
          }
          let maxWidth =
            tdNode.previousElementSibling == null ||
            tdNode.nextElementSibling == null
              ? 35
              : 30;
          if (item.width) {
            maxWidth += parseFloat(item.width.replace("px"));
          } else {
            maxWidth += Math.max(
              thNode.querySelector(".inner-cell").clientWidth,
              tdNode.querySelector(".inner-cell").clientWidth
            );
          }
          thFirstNode.style.width = maxWidth + "px";
          tdNode.style.width = maxWidth + "px";
        }
      });
      if (container.nodeName == "M-TABLE") {
        let fixedVisableHeaderNodes = Array.from(
          container.querySelectorAll(
            ".m-table-fixed-header tr:first-of-type th"
          )
        );
        fixedVisableHeaderNodes.forEach(function(fixedVisableHeaderNode) {
          let colIndex = fixedVisableHeaderNode.getAttribute("col-index");
          let referenceNode = container.querySelector(
            `.m-table-main-header tr[row-index=r-1] th[col-index=${colIndex}]`
          );
          if (referenceNode) {
            fixedVisableHeaderNode.style.width =
              referenceNode.clientWidth + "px";
          }
        });
        let fixedHeaderNodes = Array.from(
          container.querySelectorAll(
            ".m-table-fixed-header tr:not(:first-of-type) th"
          )
        );
        fixedHeaderNodes.forEach(function(fixedHeaderNode) {
          let rowIndex = fixedHeaderNode.parentNode.getAttribute("row-index");
          let colIndex = fixedHeaderNode.getAttribute("col-index");
          let referenceNode = container.querySelector(
            `.m-table-main-header tr[row-index=${rowIndex}] th[col-index=${colIndex}]`
          );
          if (referenceNode) {
            fixedHeaderNode.style.height = referenceNode.clientHeight + "px";
          }
        });
        let fixedBodyHorizontalNodes = Array.from(
          container.querySelectorAll(".m-table-fixed-body tr:first-of-type td")
        );
        fixedBodyHorizontalNodes.forEach(function(fixedBodyHorizontalNode) {
          let colIndex = fixedBodyHorizontalNode.getAttribute("col-index");
          let referenceNode = container.querySelector(
            `.m-table-main-body tr:first-of-type td[col-index=${colIndex}]`
          );
          if (referenceNode) {
            fixedBodyHorizontalNode.style.width =
              referenceNode.clientWidth + "px";
          }
        });
        let fixedBodyVerticalNodes = Array.from(
          container.querySelectorAll(".m-table-fixed-body td:first-of-type")
        );
        fixedBodyVerticalNodes.forEach(function(fixedBodyVerticalNode) {
          let rowIndex = fixedBodyVerticalNode.parentNode.getAttribute(
            "row-index"
          );
          let referenceNode = container.querySelector(
            `.m-table-main-body tr[row-index=${rowIndex}] td`
          );
          if (referenceNode) {
            fixedBodyVerticalNode.style.height =
              referenceNode.offsetHeight + "px";
          }
        });
        let fixedHeader = container.shadowRoot.querySelector(
          ".fixed-table-header"
        );
      }
      let scrollDiff = mainBody.scrollWidth - tableBody.clientWidth;
      if (container.nodeName == "M-TABLE") {
        if (
          scrollDiff > 0 &&
          tableBody.scrollLeft != scrollDiff &&
          !fixedBody.classList.contains("more")
        ) {
          fixedBody.classList.add("more");
        }
        if (tableBody.scrollLeft == scrollDiff) {
          fixedBody.classList.remove("more");
        }
      }
      if (mainBody.scrollHeight > mainBody.clientHeight) {
        mainHeader.style.overflowY = "scroll";
        if (container.nodeName == "M-TABLE") {
          fixedHeader.style.overflowY = "scroll";
        }
      } else {
        mainHeader.style.overflowY = false;
        if (container.nodeName == "M-TABLE") {
          fixedHeader.style.overflowY = false;
        }
      }
    } catch (e) {
      return false;
    }
  }

  // m-option 定义
  class mOption extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.initVerification();
      this.initComponent();
      if (!this.previousElementSibling || this.hasAttribute("selected")) {
        this.parentElement.resetSelect();
      }
      this.style.padding = "0 !important";
      let optionWidth = this.clientWidth;
      this.style.padding = false;
      this.parentNode.calcLabelSize(optionWidth); // 计算label的尺寸
    }

    initVerification() {
      // 合法性验证
      if (this.parentNode.nodeName != "M-SELECT") {
        let param = {
          name: "m-option",
          message: "m-option must be wrapped by <m-select>"
        };
        mError.apply(param, [this]);
      }
    }

    initComponent() {
      let self = this;
      if (this.hasAttribute("value") == false) {
        this.value = this.innerText.trim();
      }
      this.addEventListener("mouseenter", function(e) {
        if (self.parentNode.listCloseDelay) {
          clearTimeout(self.parentNode.listCloseDelay);
          self.parentNode.listCloseDelay = null;
        }
      });
      this.addEventListener("click", this.clickEventListener);
    }

    clickEventListener(e) {
      if (this.parentNode.disabled || this.disabled) {
        // 选项禁用
        return false;
      }
      if (this.selected) {
        // 选项已选中
        return false;
      }
      this.selected = true;
      this.parentElement.changeEvent.value = this.getAttribute("value");
      this.parentElement.removeHoverState();
    }

    get value() {
      return this.getAttribute("value");
    }

    set value(value) {
      this.setAttribute("value", value);
    }

    get selected() {
      return this.hasAttribute("selected");
    }

    set selected(value) {
      if (value) {
        if (this.selected) {
          return false;
        }
        Array.from(
          this.parentNode.querySelectorAll("m-option[selected]")
        ).forEach(function(node) {
          node.selected = false;
        });
        this.setAttribute("selected", "");
        this.parentNode.shadowRoot.querySelector(
          ".m-select span"
        ).innerHTML = this.innerHTML;
        this.parentElement.dispatchEvent(this.parentElement.changeEvent);
      } else {
        this.removeAttribute("selected");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
  }

  // m-select 定义
  class mSelect extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    connectedCallback() {
      // 挂载到文档流生命周期钩子
      if (this.parentElement.nodeName == "M-FORM-ITEM") {
        this.parentElement.noEmpty();
      }
    }

    initComponent() {
      // 取值
      let self = this;
      let disabled = this.hasAttribute("disabled"); // 禁用状态
      // 创建shadowDOM
      let shadow = this.attachShadow({
        mode: "open"
      });
      shadow.resetStyleInheritance = true; // 重置样式
      let nodeArray = Array.from(this.querySelectorAll("m-option[selected]"));
      let nodeSelected =
        nodeArray.length > 0
          ? nodeArray[nodeArray.length - 1]
          : this.querySelector(`m-option`);
      for (let i = 0, len = nodeArray.length; i < len - 1; i++) {
        nodeArray[i].removeAttribute("selected");
      }
      if (nodeSelected && !nodeSelected.hasAttribute("selected")) {
        nodeSelected.setAttribute("selected", "");
      }
      let html = `
        <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
        <style type="text/css">
          :host(m-select) {
            cursor: default;
            position: relative;
            display: inline-flex;
          }
          :host(m-select) .m-select {
            width: var(--m-select-width, fit-content);
            max-width: var(--m-select-width, 240px);
            padding: var(--m-select-padding, 0 15px);
            color: var(--m-select-color, #8f8f8f);
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
          :host(m-select) .m-select.disabled,
          :host(m-select) .m-select.active.disabled {
            color:  var(--m-select-disable-color, #c8c8c8);
            cursor: not-allowed;
          }
          :host(m-select) .m-select.active {
            color: var(--m-select-active-color, #000);
          }
          :host(m-select) .m-select span,
          :host(m-select) .m-select i {
            line-height: 1;
          }
          :host(m-select) .m-select span {
            max-width: calc(100% - 24px);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          :host(m-select) .m-select i {
            margin-left: 8px;
            transition: transform 200ms linear;
          }
          :host(m-select) .m-select i.arrow-rotate {
            transform: rotateX(180deg);
          }
          :host(m-select) .m-select-option {
            width: fit-content;
            max-width: 240px;
            height: 0;
            padding: 0;
            overflow: hidden;
            transition: height .3s ease, opacity .2s linear;
            position: fixed;
            z-index: 0;
          }
          :host(m-select) .m-select-option.active {
            opacity: 1;
          }
          :host(m-select) .m-select-option .arrow-up {
            content: "";
            width: 100%;
            height: 4px;
            background-image: url("${url}images/select_arrow.png");
            background-repeat: no-repeat;
            background-position: center 0;
            display: block;
          }
          :host(m-select) .m-select-option.rotate .arrow-up {
            display: none;
          }
          :host(m-select) .m-select-option .arrow-down {
            content: "";
            width: 100%;
            height: 4px;
            background-image: url("${url}images/select_arrow.png");
            background-repeat: no-repeat;
            background-position: center 0;
            transform: rotate(180deg);
            display: none;
          }
          :host(m-select) .m-select-option.rotate .arrow-down {
            display: block;
          }
          :host(m-select) .m-select-option .option-list {
            width: 100%;
            height: fit-content;
            padding: 8px 0;
            list-style: none;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: rgba(0,0,0,.1) 4px 2px 4px;
            box-sizing: border-box;
            position: relative;
          }
          :host(m-select) .m-select-option.rotate .option-list {
            box-shadow: rgba(0,0,0,.1) 4px 2px 4px;
          }
          :host(m-select) .m-select-option .option-list > div:first-child {
            width: 100%;
            height: fit-content;
            max-height: 180px;
            overflow: hidden;
            position: relative;
          }
          :host(m-select) .m-select-option .option-list .scroll-bar {
            content: "";
            width: 6px;
            height: 0;
            border-radius: 3px;
            background-color: #0359ff;
            position: absolute;
            top: 0;
            right: 0;
            margin-top: 8px;
          }
          :host(m-select) .m-select-option ::slotted(m-option) {
            width: 100%;
            padding: 0 12px;
            color: var(--m-option-color, #333);
            white-space: nowrap;
            line-height: 30px;
            text-overflow: ellipsis;
            list-style: none;
            overflow: hidden;
            box-sizing: border-box;
            display: block;
          }
          :host(m-select) .m-select-option ::slotted(m-option:hover),
          :host(m-select) .m-select-option ::slotted(m-option[selected]) {
            color: var(--m-option-active-color, #0359ff);
            background-color: var(--m-option-active-bg, #f3f3f3);
          }
          :host(m-select) .m-select-option ::slotted(m-option[disabled]),
          :host(m-select) .m-select-option ::slotted(m-option[disabled]:hover) {
            color: var(--m-option-disable-color, #c8c8c8);
            background: none;
            cursor: not-allowed;
          }
        </style>
        <div class="m-select${disabled ? " disabled" : ""}">
          <span>${nodeSelected ? nodeSelected.innerHTML || " " : " "}</span>
          <i class="m-iconfont ming-icon-arrow-down"></i>
        </div>
        <div class="m-select-option">
          <div class="arrow-up"></div>
          <div class="option-list">
            <div><slot></slot></div>
            <div class="scroll-bar"></div>
          </div>
          <div class="arrow-down"></div>
        </div>
      `;
      shadow.innerHTML = html;
      self.changeEvent = document.createEvent("Event");
      self.changeEvent.initEvent("change", false, false);
      this.addEventListener("mouseenter", this.addHoverState);
      this.addEventListener("mouseout", function(e) {
        self.listCloseDelay = setTimeout(function() {
          self.removeHoverState();
        }, 300);
      });
      this.addEventListener("mouseover", function(e) {
        if (self.listCloseDelay) {
          clearTimeout(self.listCloseDelay);
          self.listCloseDelay = null;
        }
      });
      this.addEventListener("mousewheel", function(e) {
        e.stopPropagation();
        e.cancelBubble = true;
        e.preventDefault();
        e.returnValue = false;
      });
      this.shadowRoot
        .querySelector(".m-select-option")
        .addEventListener("mouseenter", function(e) {
          if (self.listCloseDelay) {
            clearTimeout(self.listCloseDelay);
            self.listCloseDelay = null;
          }
        });
      this.shadowRoot
        .querySelector(".m-select-option")
        .addEventListener("mouseover", function(e) {
          if (self.listCloseDelay) {
            clearTimeout(self.listCloseDelay);
            self.listCloseDelay = null;
          }
        });
      this.shadowRoot
        .querySelector(".m-select-option")
        .addEventListener("mousewheel", function(e) {
          let target = this.querySelector(".option-list div");
          let bar = this.querySelector(".option-list .scroll-bar");
          let top = target.scrollTop;
          let scrollStep = 50;
          let result = 0;
          let maxScroll = target.scrollHeight - target.clientHeight;
          if (e.deltaY > 0) {
            // 向下滚动滚轮
            result =
              top + scrollStep > maxScroll ? maxScroll : top + scrollStep;
          } else {
            // 向上滚动
            result = top - scrollStep > 0 ? top - scrollStep : 0;
          }
          ScrollTop(target, result, 150, bar);
        });
    }

    resetSelect() {
      let nodeArray = Array.from(this.querySelectorAll("m-option[selected]"));
      let nodeSelected =
        nodeArray.length > 0
          ? nodeArray[nodeArray.length - 1]
          : this.querySelector(`m-option`);
      for (let i = 0, len = nodeArray.length; i < len - 1; i++) {
        nodeArray[i].removeAttribute("selected");
      }
      if (nodeSelected && !nodeSelected.hasAttribute("selected")) {
        nodeSelected.setAttribute("selected", "");
      }
      this.shadowRoot.querySelector(".m-select span").innerHTML = nodeSelected
        ? nodeSelected.innerHTML || " "
        : " ";
    }

    addHoverState() {
      if (this.disabled) {
        return false;
      }
      if (this.listCloseDelay) {
        clearTimeout(this.listCloseDelay);
        this.listCloseDelay = null;
        return false;
      }
      if (this.listStyleResetDelay) {
        clearTimeout(this.listStyleResetDelay);
        this.listStyleResetDelay = null;
      }
      this.shadowRoot.querySelector(".m-select").classList.add("active");
      this.shadowRoot
        .querySelector(".m-select i")
        .classList.add("arrow-rotate");
      let optionLength = Array.from(this.querySelectorAll("m-option")).length;
      this.shadowRoot.querySelector(".m-select-option").classList.add("active");
      this.fullListHeight = optionLength * 30;
      let listHeight = Math.min(this.fullListHeight, 180);
      this.shadowRoot.querySelector(".m-select-option").style.height =
        listHeight + 4 + 8 * 2 + "px";
      this.calcWidthAndPosition();
      this.shadowRoot.querySelector(".m-select-option").style.zIndex = 999;
    }

    removeHoverState() {
      let self = this;
      this.shadowRoot.querySelector(".m-select").classList.remove("active");
      this.shadowRoot
        .querySelector(".m-select-option")
        .classList.remove("active");
      this.shadowRoot
        .querySelector(".m-select i")
        .classList.remove("arrow-rotate");
      this.shadowRoot.querySelector(".m-select-option").style.height = 0;
      this.listStyleResetDelay = setTimeout(function() {
        self.resetListStyle();
      }, 300);
    }

    resetListStyle() {
      this.shadowRoot.querySelector(".m-select-option").style.padding = "0 8px";
      this.shadowRoot.querySelector(".m-select-option").style.zIndex = 0;
    }

    calcLabelSize(optionWidth) {
      let self = this;
      let selectStyle = window.getComputedStyle(this);
      if (self.optionWidth == undefined) {
        self.operationWidth = 0;
      }
      self.optionWidth =
        self.optionWidth > optionWidth ? self.optionWidth : optionWidth;
      if (selectStyle.getPropertyValue("--m-select-width") == "") {
        this.shadowRoot.querySelector(".m-select").style.width =
          self.optionWidth + 32 + "px";
      }
    }

    calcWidthAndPosition() {
      let self = this;
      let selectStyle = window.getComputedStyle(
        this.shadowRoot.querySelector(".m-select")
      );
      let selectWidth = new RegExp(/px/).test(
        selectStyle.getPropertyValue("--m-select-width")
      )
        ? parseFloat(
            selectStyle.getPropertyValue("--m-select-width").replace("px", "")
          )
        : 0;
      self.optionWidth = Math.max(
        self.optionWidth,
        this.offsetWidth,
        selectWidth
      );
      this.shadowRoot.querySelector(".m-select-option").style.width =
        self.optionWidth + "px";
      let componentPosition = self.getBoundingClientRect();
      let position = {
        top: componentPosition.top + componentPosition.height,
        left: componentPosition.left - 8,
        bottom: window.innerHeight - componentPosition.top,
        right:
          window.innerWidth -
          componentPosition.width -
          componentPosition.left -
          8
      };
      let optionListHeight = parseInt(
        this.shadowRoot
          .querySelector(".m-select-option")
          .style.height.replace("px")
      );
      if (position.top + optionListHeight + 20 >= window.innerHeight) {
        this.shadowRoot.querySelector(".m-select-option").style.top = null;
        this.shadowRoot.querySelector(".m-select-option").style.bottom =
          position.bottom + "px";
        this.shadowRoot.querySelector(".m-select-option").classList =
          "m-select-option rotate";
        this.shadowRoot.querySelector(".m-select-option").style.padding =
          "8px 8px 12px";
      } else {
        this.shadowRoot.querySelector(".m-select-option").style.bottom = null;
        this.shadowRoot.querySelector(".m-select-option").style.top =
          position.top + "px";
        this.shadowRoot.querySelector(".m-select-option").classList =
          "m-select-option";
        this.shadowRoot.querySelector(".m-select-option").style.padding =
          "12px 8px 8px";
      }
      if (position.left + self.optionWidth >= window.innerWidth) {
        this.shadowRoot.querySelector(".m-select-option").style.left = null;
        this.shadowRoot.querySelector(".m-select-option").style.right =
          position.right + "px";
      } else {
        this.shadowRoot.querySelector(".m-select-option").style.right = null;
        this.shadowRoot.querySelector(".m-select-option").style.left =
          position.left + "px";
      }
      self.listHeight = this.shadowRoot.querySelector(
        ".option-list > div"
      ).clientHeight;
      let listHeight = self.listHeight;
      let listAllHeight = this.fullListHeight;
      if (listAllHeight > listHeight) {
        let barHeight = parseInt((listHeight * listHeight) / listAllHeight);
        self.shadowRoot.querySelector(".scroll-bar").style.height =
          barHeight + "px";
      }
    }

    set value(value) {
      let nodeSelected = this.querySelector(`m-option[value="${value}"]`);
      if (nodeSelected) {
        nodeSelected.selected = true;
      } else {
        nodeSelected = this.querySelector(`m-option`);
        if (nodeSelected) {
          nodeSelected.selected = true;
        } else {
          this.shadowRoot.querySelector(".m-select span").innerHTML = "";
        }
      }
    }

    get value() {
      let nodeSelected = this.querySelector("m-option[selected]");
      if (nodeSelected) {
        return nodeSelected.value;
      } else {
        nodeSelected = this.querySelector("m-option");
        if (nodeSelected) {
          return nodeSelected.value;
        } else {
          return undefined;
        }
      }
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
        this.shadowRoot.querySelector(".m-select").classList.add("disabled");
      } else {
        this.removeAttribute("disabled");
        this.shadowRoot.querySelector(".m-select").classList.remove("disabled");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }
  }

  // m-input 定义
  class mInput extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    connectedCallback() {
      // 挂载DOM时生命周期钩子
      let inputType = this.getAttribute("type") || "text";
      let value = this.getAttribute("value") || "";
      if (
        value &&
        value != "" &&
        this.parentElement.nodeName == "M-FORM-ITEM" &&
        typeof this.parentElement.noEmpty == "function"
      ) {
        this.parentElement.noEmpty();
      }
      if (this.parentElement.nodeName == "M-FORM-ITEM") {
        this.addEventListener("change", function() {
          this.parentElement.removeAttribute("error");
        });
      }
      if (inputType == "date") {
        this.parentElement.noEmpty();
      }
    }

    initComponent() {
      // 组件初始化
      let self = this;
      let inputType = this.getAttribute("type") || "text";
      let maxlength = this.getAttribute("maxlength") || "16";
      let placeholder = this.getAttribute("placeholder") || "";
      let disabled = this.hasAttribute("disabled");
      let value = this.getAttribute("value") || "";
      let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
      shadow.resetStyleInheritance = true; // 重置样式
      let html = `
        <style type="text/css">
        :host(m-input) {
          display: inline-flex;
        }
        :host(m-input) > div {
          position: relative;
        }
        :host(m-input) > div::after {
          content: "";
          width: 0;
          height: 1px;
          background-color: var(--m-input-active-border-color, #0359ff);
          transition: width .3s linear;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        :host(m-input) > div.active::after {
          width: 100%;
        }
        :host(m-input) input {
          width: var(--m-input-width, auto);
          padding: 0 5px;
          color: var(--m-input-color, rgba(0,0,0,0.87));
          line-height: var(--m-input-line-height, 30px);
          border: none;
          outline: none;
          background: none;
          border-bottom: 1px solid var(--m-input-border-color, #e6e6e6);
          box-sizing: border-box;
        }
        :host(m-input) input:hover,
        :host(m-input) input:focus {
          color: var(--m-input-active-color, #000);
        }
        :host(m-input) input[disabled],
        :host(m-input) input[disabled]:hover,
        :host(m-input) input[disabled]:focus {
          color: var(--m-input-disable-color, #e6e6e6);
          cursor: not-allowed;
          border-bottom: 1px solid var(--m-input-disable-border-color, #f6f6f6);
        }
        </style>
        <div>
          <input type="${inputType}" maxlength=${maxlength} value="${value}" placeholder="${placeholder}" ${
        disabled ? " disabled" : ""
      }>
        </div>
      `;
      shadow.innerHTML = html;
      self.focusEvent = document.createEvent("Event");
      self.focusEvent.initEvent("focus", false, false);
      self.blurEvent = document.createEvent("Event");
      self.blurEvent.initEvent("blur", false, false);
      self.changeEvent = document.createEvent("Event");
      self.changeEvent.initEvent("change", false, false);
      this.shadowRoot
        .querySelector("input")
        .addEventListener("focus", function(event) {
          event.stopPropagation();
          self.focusEventHandler.call(self);
          self.dispatchEvent(self.focusEvent);
          return false;
        });
      this.shadowRoot
        .querySelector("input")
        .addEventListener("blur", function(event) {
          event.stopPropagation();
          self.blurEventHandler.call(self);
          self.dispatchEvent(self.blurEvent);
          return false;
        });
      this.shadowRoot
        .querySelector("input")
        .addEventListener("change", function(event) {
          event.stopPropagation();
          self.dispatchEvent(self.changeEvent);
          return false;
        });
    }

    focusEventHandler() {
      // 输入框获得焦点
      this.shadowRoot.querySelector("div").classList.add("active");
      if (this.parentNode.nodeName == "M-FORM-ITEM") {
        this.parentNode.focus();
      }
    }

    blurEventHandler() {
      // 输入框失去焦点
      this.shadowRoot.querySelector("div").classList.remove("active");
      if (this.parentNode.nodeName == "M-FORM-ITEM") {
        if (this.type == "date") {
          this.parentNode.blur();
        } else {
          if (
            this.value == undefined ||
            this.value == null ||
            this.value == ""
          ) {
            this.parentNode.blurEmpty();
          } else {
            this.parentNode.blur();
          }
        }
      }
    }

    focus() {
      this.shadowRoot.querySelector("input").focus();
    }

    blur() {
      this.shadowRoot.querySelector("input").blur();
    }

    get value() {
      return this.shadowRoot.querySelector("input").value;
    }

    set value(value) {
      if (!value) {
        value = "";
      }
      this.setAttribute("value", value);
      this.shadowRoot.querySelector("input").value = value;
      let inputType = this.getAttribute("type") || "text";
      if (
        value &&
        value != "" &&
        this.parentElement.nodeName == "M-FORM-ITEM" &&
        typeof this.parentElement.noEmpty == "function"
      ) {
        this.parentElement.noEmpty();
      }
      if (inputType == "date") {
        this.parentElement.noEmpty();
      }
    }

    get placeholder() {
      return this.getAttribute("placeholder") || "";
    }

    set placeholder(value) {
      if (value) {
        this.setAttribute("value", value);
        this.shadowRoot.querySelector("input").setAttribute("value", value);
      } else {
        this.setAttribute("value", "");
        this.shadowRoot.querySelector("input").setAttribute("value", "");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    set disable(value) {
      if (value) {
        this.setAttribute("disabled", "");
        this.shadowRoot.querySelector("input").setAttribute("disabled");
      } else {
        this.removeAttribute("disabled");
        this.shadowRoot.querySelector("input").removeAttribute("disabled");
      }
    }

    get type() {
      return this.getAttribute("type") || "text";
    }

    set type(value) {
      if (
        value != "text" &&
        value != "password" &&
        value != "number" &&
        value != "date"
      ) {
        value = "text";
      }
      this.setAttribute("type", value);
      this.shadowRoot.querySelector("input").setAttribute("type", value);
    }

    get maxlength() {
      return this.getAttribute("maxlength") || "16";
    }

    set maxlength(value) {
      try {
        value = parseInt(value);
        this.setAttribute("maxlength", value);
        this.shadowRoot.querySelector("input").setAttribute("maxlength", value);
      } catch (e) {
        return false;
      }
    }
  }

  // m-file 定义
  class mFile extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 组件初始化
      let self = this;
      let disabled = this.hasAttribute("disabled");
      let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
      shadow.resetStyleInheritance = true; // 重置样式
      let html = `
        <style type="text/css">
          :host(m-file) {
            cursor: default;
            display: inline-flex;
            align-items: center;
          }
          :host(m-file[disabled]) {
            cursor: not-allowed;
          }
          :host(m-file) div {
            display: flex;
            align-items: center;
          }
          :host(m-file) a {
            padding: 0 8px;
            color: var(--m-file-color, #0359ff);
            font-size: 14px;
            line-height: 1.5;
            text-decoration: none;
            border-radius: 4px;
            border: var(--m-file-color, #0359ff) 1px solid;
            background-color: rgba(3,89,255,.1);
            display: inline-flex;
            position: relative;
          }
          :host(m-file) a:hover {
            color: #fff;
            background-color: var(--m-file-color, #0359ff);
          }
          :host(m-file[disabled]) a {
            color: #8f8f8f;
            cursor: not-allowed;
            border-color: #8f8f8f;
            background-color: rgba(143,143,143,.1);
          }
          :host(m-file[disabled]) a:hover {
            color: #8f8f8f;
            background-color: rgba(143,143,143,.1);
          }
          :host(m-file) input {
            width: 100%;
            height: 100%;
            padding: 0;
            border: none;
            background: none;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
          }
          :host(m-file[disabled]) input {
            cursor: not-allowed;
          }
          :host(m-file) .file-name {
            height: fit-content;
            padding: 0 5px;
            color: #8f8f8f;
            font-size: 14px;
          }
          :host(m-file) .file-name.active {
            color: #000;
          }
        </style>
        <div>
          <a href="javascript:;">
            选择文件
            <input type="file" ${disabled ? "disabled" : ""}>
          </a>
          <span class="file-name">未选择任何文件</span>
        </div>
      `;
      shadow.innerHTML = html;
      this.shadowRoot
        .querySelector("input")
        .addEventListener("change", function(e) {
          let files = Array.from(this.files);
          if (files.length > 0) {
            let file = files[0];
            this.previousSibling.nodeValue = "重新选择";
            this.parentElement.nextElementSibling.classList.add("active");
            this.parentElement.nextElementSibling.innerText = file.name;
          } else {
            this.previousSibling.nodeValue = "选择文件";
            this.parentElement.nextElementSibling.classList.remove("active");
            this.parentElement.nextElementSibling.innerText = "未选择任何文件";
          }
        });
      this.shadowRoot
        .querySelector("span")
        .addEventListener("click", function() {
          this.previousElementSibling.querySelector("input").click();
        });
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
        this.shadowRoot.querySelector("input").setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled", "");
        this.shadowRoot.querySelector("input").removeAttribute("disabled", "");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    get value() {
      let files = Array.from(this.shadowRoot.querySelector("input").files);
      if (files.length > 0) {
        return files[0];
      } else {
        return null;
      }
    }
  }

  // m-date 定义
  class mDate extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 组件初始化
    }
  }

  // m-color 定义
  class mColor extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 组件初始化
    }
  }

  // m-switch 定义
  class mSwitch extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 组件初始化
      let self = this;
      let selected = self.hasAttribute("selected");
      let disabled = self.hasAttribute("disabled");
      let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
      shadow.resetStyleInheritance = true; // 重置样式
      let html = `
        <style type="text/css">
          :host(m-switch) {
            width: fit-content;
            cursor: pointer;
            display: inline-flex;
          }
          :host(m-switch[disabled]) {
            cursor: not-allowed;
          }
          :host(m-switch) .switch {
            width: 50px;
            height: 28px;
            border-radius: 14px;
            box-sizing: border-box;
            box-shadow: rgba(0,0,0,.1) 0 0 10px inset;
            background-color: #f9f9f9;
            transition: background .3s linear;
          }
          :host(m-switch) .switch.active {
            background-color: #75d991;
          }
          :host(m-switch[disabled]) .switch {
            background-color: #dfdfdf;
          }
          :host(m-switch) .switch .switch-label {
            width: 22px;
            height: 22px;
            border-radius: 11px;
            background-color: #fff;
            box-shadow: rgba(0,0,0,.1) 0 0 3px;
            transition: margin .3s ease-out;
            margin: 3px 0 0 3px;
          }
          :host(m-switch) .switch.active .switch-label {
            margin: 3px 0 0 25px;
          }
          :host(m-switch[disabled]) .switch .switch-label {
            background-color: #f6f6f6;
            margin: 3px 0 0 3px;
          }
        </style>
        <div class="switch${selected ? " active" : ""}">
          <div class="switch-label"></div>
        </div>
      `;
      shadow.innerHTML = html;
      self.changeEvent = document.createEvent("Event");
      self.changeEvent.initEvent("change", false, false);
      this.addEventListener("click", function(e) {
        e.preventDefault();
        self.toggleActive();
        return false;
      });
    }

    toggleActive() {
      // 切换激活状态
      if (this.disabled) {
        return false;
      }
      this.shadowRoot.querySelector(".switch").classList.toggle("active");
      if (
        this.shadowRoot.querySelector(".switch").classList.contains("active")
      ) {
        this.setAttribute("selected", "");
      } else {
        this.removeAttribute("selected");
      }
      this.changeEvent.value = this.shadowRoot
        .querySelector(".switch")
        .classList.contains("active");
      this.dispatchEvent(this.changeEvent);
    }

    get value() {
      return this.shadowRoot
        .querySelector(".switch")
        .classList.contains("active");
    }

    set value(value) {
      if (value) {
        this.shadowRoot.querySelector(".switch").classList.add("active");
        this.setAttribute("selected", "");
      } else {
        this.shadowRoot.querySelector(".switch").classList.remove("active");
        this.removeAttribute("selected");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
  }

  // m-tag 定义
  class mTag extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    connectedCallback() {
      if (this.parentElement.nodeName == "M-FORM-ITEM") {
        this.parentElement.noEmpty();
      }
    }

    initComponent() {
      // 组件初始化
      let self = this;
      let selected = self.hasAttribute("selected");
      let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
      shadow.resetStyleInheritance = true; // 重置样式
      let html = `
        <style type="text/css">
          :host(m-tag) {
            width: fit-content;
            cursor: pointer;
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Chrome/Safari/Opera */
            -khtml-user-select: none; /* Konqueror */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently not supported by any browser */
            display: inline-flex;
          }
          :host(m-tag[disabled]) {
            cursor: not-allowed;
          }
          :host(m-tag) .tag {
            width: fit-content;
            padding: 0 6px;
            color: var(--m-tag-color, #636363);
            font-size: var(--m-tag-font-size, 14px);
            white-space: nowrap;
            line-height: 1.5;
            border-radius: 3px;
            border: var(--m-tag-color, #636363) 1px solid;
            background-color: #fff;
            transition: all .2s linear;
          }
          :host(m-tag:not([disabled])) .tag:hover {
            color: var(--m-tag-active-color, #0359ff);
            border: var(--m-tag-active-color, #0359ff) 1px solid;
          }
          :host(m-tag:not([disabled])) .tag.active {
            color: var(--m-tag-active-color, #0359ff);
            border: var(--m-tag-active-color, #0359ff) 1px solid;
            background-color: var(--m-tag-active-bg, rgba(3,99,255,.05));
          }
          :host(m-tag[disabled]) .tag {
            color: var(--m-tag-disable-color, #c8c8c8);
            border: var(--m-tag-disable-color, #c8c8c8) 1px solid;
          }
        </style>
        <div class="tag${selected ? " active" : ""}">
          <slot></slot>
        </div>
      `;
      shadow.innerHTML = html;
      self.changeEvent = document.createEvent("Event");
      self.changeEvent.initEvent("change", false, false);
      this.addEventListener("click", function(e) {
        e.preventDefault();
        self.toggleActive();
        return false;
      });
    }

    toggleActive() {
      // 切换激活状态
      if (this.disabled) {
        return false;
      }
      this.shadowRoot.querySelector(".tag").classList.toggle("active");
      if (this.shadowRoot.querySelector(".tag").classList.contains("active")) {
        this.setAttribute("selected", "");
      } else {
        this.removeAttribute("selected");
      }
      this.changeEvent.value = this.shadowRoot
        .querySelector(".tag")
        .classList.contains("active");
      this.dispatchEvent(this.changeEvent);
    }

    get indic() {
      return this.getAttribute("indic") || false;
    }

    set indic(value) {
      if (value) {
        this.setAttribute("indic", value);
      } else {
        this.removeAttribute("indic");
      }
    }

    get value() {
      return this.shadowRoot.querySelector(".tag").classList.contains("active");
    }

    set value(value) {
      if (value) {
        this.shadowRoot.querySelector(".tag").classList.add("active");
        this.setAttribute("selected", "");
      } else {
        this.shadowRoot.querySelector(".tag").classList.remove("active");
        this.removeAttribute("selected");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
  }

  // m-form-item 定义
  class mFormItem extends HTMLElement {
    constructor() {
      super();
      this.initVerification();
      this.initComponent();
    }

    initVerification() {
      // 合法性验证
      if (this.children.length > 1) {
        let param = {
          name: "m-form-item",
          message: "this component should have only one child node"
        };
        mError.apply(param, [this]);
      }
      if (
        this.children.length > 0 &&
        this.children[0].nodeName != "M-INPUT" &&
        this.children[0].nodeName != "M-SELECT"
      ) {
        let param = {
          name: "m-form-item",
          message:
            "this component's child node should be <m-select> or <m-input>"
        };
        mError.apply(param, [this]);
      }
    }

    initComponent() {
      // 组件初始化
      let self = this;
      let name = self.getAttribute("name") || "name";
      let value = self.children.length > 0 ? self.children[0].value : "";
      let empty = false;
      if (self.children.length > 0) {
        switch (self.children[0].nodeName) {
          case "M-INPUT":
            if (value == undefined || value == null || value == "") {
              empty = true;
            }
            break;
          case "M-SELECT":
            break;
        }
      } else {
        empty = true;
      }
      let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
      shadow.resetStyleInheritance = true; // 重置样式
      let html = `
        <style type="text/css">
          :host(m-form-item) {
            width: fit-content;
            height: auto;
            display: inline-flex;
          }
          :host(m-form-item) .item {
            width: 100%;
            height: fit-content;
            min-height: 30px;
            padding-top: 20px;
            position: relative;
          }
          :host(m-form-item) .name {
            padding-left: 5px;
            cursor: default;
            transition: all .3s linear;
            position: absolute;
            left: 0;
            z-index: 50;
          }
          :host(m-form-item[required]) .name::after {
            content: "*";
            color: #d9534f;
            margin: -2px 0 0 2px;
          }
          :host(m-form-item[error]) .name {
            color: var(--m-error-color, #d9534f) !important;
          }
          :host(m-form-item) :not(.empty) .name {
            color: #b3b3b3;
            font-size: 12px;
            line-height: 15px;
            top: 0;
          }
          :host(m-form-item) .active .name {
            color: var(--m-form-item-active-color, #0359ff);
          }
          :host(m-form-item) .empty .name {
            color: var(--m-form-item-color, rgba(0,0,0,0.38));
            font-size: inherit;
            line-height: 30px;
            top: 20px;
          }
          :host(m-form-item) ::slotted(m-select) {
            height: 30px;
            border-bottom: 1px solid #e6e6e6;
            --m-select-padding: 0 5px;
            --m-select-color: rgba(0,0,0,0.87);
          }
          :host(m-form-item) ::slotted(m-select[disabled]) {
            border-bottom: 1px solid #f6f6f6;
          }
          :host(m-form-item[error]) ::slotted(m-input) {
            --m-input-border-color: var(--m-error-color, #d9534f);
            --m-input-active-border-color: var(--m-error-color, #d9534f);
          }
          :host(m-form-item) ::slotted(m-select[type=file]) {
            height: 30px;
            border-bottom: 1px solid #e6e6e6;
          }
          :host(m-form-item) ::slotted(m-select[type=file][disabled]) {
            border-bottom: 1px solid #f6f6f6;
          }
          :host(m-form-item) ::slotted(m-tag) {
            --m-tag-font-size: 12px;
            margin-top: 8px;
          }
          :host(m-form-item) ::slotted(m-tag:not(:last-of-type)) {
            margin-right: 6px;
          }
        </style>
        <div class="item${empty ? " empty" : ""}">
          <div class="name">${name}</div>
          <div>
            <slot></slot>
          </div>
        </div>
      `;
      shadow.innerHTML = html;
      this.shadowRoot
        .querySelector(".name")
        .addEventListener("click", function() {
          self.children[0].focus();
        });
    }

    focus() {
      this.shadowRoot.querySelector(".item").classList.add("active");
      this.shadowRoot.querySelector(".item").classList.remove("empty");
    }

    blurEmpty() {
      this.shadowRoot.querySelector(".item").classList.add("empty");
      this.shadowRoot.querySelector(".item").classList.remove("active");
    }

    blur() {
      this.shadowRoot.querySelector(".item").classList.remove("active");
    }

    noEmpty() {
      this.shadowRoot.querySelector(".item").classList.remove("empty");
    }

    set name(value) {
      this.shadowRoot.querySelector(".item .name").innerHTML = value;
    }

    get name() {
      return this.shadowRoot.querySelector(".item .name").innerHTML;
    }

    set required(value) {
      if (value) {
        this.setAttribute("required", "");
      } else {
        this.removeAttribute("required");
      }
    }

    set error(value) {
      if (value) {
        this.setAttribute("error", "");
        if (this.children[0].nodeName == "M-INPUT") {
          this.children[0].focus();
        }
      } else {
        this.removeAttribute("error");
      }
    }

    get error() {
      return this.hasAttribute("error");
    }
  }

  // m-operation 定义
  class mOperation extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    attachedCallback() {
      // 挂在生命周期钩子
      this.initVerification();
    }

    initVerification() {
      // 合法性验证
      if (this.parentNode.nodeName != "M-OPERATION-LIST") {
        let param = {
          name: "m-operation",
          message: "m-operation must be wrapped by <m-operation-list>"
        };
        mError.apply(param, [this]);
      }
    }

    initComponent() {
      // 组件初始化
      let self = this;
      this.addEventListener("mouseenter", function(e) {
        if (self.parentNode.listCloseDelay) {
          clearTimeout(self.parentNode.listCloseDelay);
          self.parentNode.listCloseDelay = null;
        }
      });
      this.addEventListener("click", this.clickEventListener);
    }

    clickEventListener(e) {
      if (this.parentNode.disabled || this.disabled) {
        // 操作是否禁用
        return false;
      }
      let operation = this.operation;
      let operationName = operation ? operation.replace(/\((.)*\)/g, "") : "";
      if (operation) {
        try {
          let paramStr = "";
          if (
            new RegExp(/\(/).test(operation) &&
            new RegExp(/\)/).test(operation)
          ) {
            paramStr =
              "," +
              operation
                .match(new RegExp(/\((.)*\)/))[0]
                .replace("(", "")
                .replace(")", "");
          }
          eval(`${operationName}(this, e${paramStr})`);
        } catch (e) {
          let error = {
            name: "m-operation",
            message: `function <${operationName}> is not defined`
          };
          mError.apply(error, [this]);
        }
      } else {
        let error = {
          name: "m-operation",
          message: `function <${operationName}> is not defined`
        };
        mError.apply(error, [this]);
      }
    }

    connectedCallback() {
      this.style.padding = "0 !important";
      let operationWidth = this.clientWidth;
      this.style.padding = false;
      this.parentNode.calcLabelSize(operationWidth); // 计算label的尺寸
    }

    get operation() {
      return this.getAttribute("operation");
    }

    set operation(value) {
      this.setAttribute("operation", value);
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
      let listNode = this.parentElement;
      if (listNode.nodeName == "M-OPERATION-LIST") {
        listNode.refreshOperations();
      }
    }
  }

  // m-operation-list 定义
  class mOperationList extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 获取属性值
      let self = this;
      let disabled = this.hasAttribute("disabled"); // 禁用状态
      // 创建shadowDOM
      let shadow = this.attachShadow({
        mode: "open"
      });
      shadow.resetStyleInheritance = true; // 重置样式
      let html = `
        <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
        <style type="text/css">
        :host(m-operation-list) {
            cursor: default;
            display: inline-flex;
            position: relative;
        }
        :host(m-operation-list) .m-operation-tip {
            width: 125px;
            height: 32px;
            padding: 0 12px;
            color: var(--m-operation-list-color, #fff);
            font-size: 14px;
            border-radius: 16px;
            background-color: var(--m-operation-list-bg, #0359ff);
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
        }
        :host(m-operation-list) .m-operation-tip.disabled,
        :host(m-operation-list:hover) .m-operation-tip.disabled {
            color: var(--m-operation-list-disable-color, #8f8f8f);
            background-color: var(--m-operation-list-disable-bg, #e9e9e9);
            cursor: not-allowed;
        }
        :host(m-operation-list:hover) .m-operation-tip {
        }
        :host(m-operation-list) .m-operation-tip span,
        :host(m-operation-list) .m-operation-tip i {
            line-height: 1;
        }
        :host(m-operation-list) .m-operation-tip i:last-of-type {
            margin-left: 5px;
            transition: transform 200ms linear;
        }
        :host(m-operation-list) .m-operation-tip i.arrow-rotate {
            transform: rotateX(180deg);
        }
        :host(m-operation-list) .m-operation-list {
            width: fit-content;
            max-width: 180px;
            height: 0;
            padding: 0;
            overflow: hidden;
            transition: height .3s ease, opacity .2s linear;
            position: fixed;
            z-index: 0;
        }
        :host(m-operation-list) .m-operation-list.active {
            opacity: 1;
        }
        :host(m-operation-list) .m-operation-list .arrow-up {
            content: "";
            width: 100%;
            height: 4px;
            background-image: url("${url}images/select_arrow.png");
            background-repeat: no-repeat;
            background-position: center 0;
            display: block;
        }
        :host(m-operation-list) .m-operation-list.rotate .arrow-up {
            display: none;
        }
        :host(m-operation-list) .m-operation-list .arrow-down {
            content: "";
            width: 100%;
            height: 4px;
            background-image: url("${url}images/select_arrow.png");
            background-repeat: no-repeat;
            background-position: center 0;
            transform: rotate(180deg);
            display: none;
        }
        :host(m-operation-list) .m-operation-list.rotate .arrow-down {
            display: block;
        }
        :host(m-operation-list) .m-operation-list .operation-list {
            width: 100%;
            height: fit-content;
            padding: 8px 0;
            list-style: none;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: rgba(0,0,0,.1) 4px 4px 4px;
            box-sizing: border-box;
            position: relative;
        }
        :host(m-select) .m-operation-list.rotate .operation-list {
            box-shadow: rgba(0,0,0,.1) 4px -4px 4px;
        }
        :host(m-select) .m-operation-list .operation-list > div:first-child {
            width: 100%;
            height: fit-content;
            overflow: hidden;
            position: relative;
        }
        :host(m-operation-list) .m-operation-list ::slotted(m-operation) {
            width: 100%;
            padding: 0 12px;
            color: var(--m-operation-color, #333);
            white-space: nowrap;
            line-height: 30px;
            text-overflow: ellipsis;
            list-style: none;
            overflow: hidden;
            box-sizing: border-box;
            display: block;
        }
        :host(m-operation-list) .m-operation-list ::slotted(m-operation:hover) {
            color: var(--m-operation-active-color, #0359ff);
            background-color: var(--m-operation-active-bg, #f3f3f3);
        }
        :host(m-operation-list) .m-operation-list ::slotted(m-operation[disabled]) {
            color: var(--m-operation-disable-color, #8f8f8f);
            cursor: not-allowed;
            background: none;
        }
      </style>
      <div class="m-operation-tip${disabled ? " disabled" : ""}">
          <i class="m-iconfont ming-icon-operation"></i>
          <span>相关操作</span>
          <i class="arrow m-iconfont ming-icon-arrow-down"></i>
      </div>
      <div class="m-operation-list">
          <div class="arrow-up"></div>
          <div class="operation-list">
              <div><slot></slot></div>
          </div>
          <div class="arrow-down"></div>
      </div>
    `;
      shadow.innerHTML = html;
      this.calcLabelSize(); // 计算宽度和位置
      this.addEventListener("mouseenter", this.addHoverState);
      this.addEventListener("mouseover", function(e) {
        if (self.listCloseDelay) {
          clearTimeout(self.listCloseDelay);
          self.listCloseDelay = null;
        }
      });
      this.addEventListener("mouseout", function(e) {
        self.listCloseDelay = setTimeout(function() {
          self.removeHoverState();
        }, 300);
      });
      this.addEventListener("mousewheel", function(e) {
        e.stopPropagation();
        e.cancelBubble = true;
        e.preventDefault();
        e.returnValue = false;
      });
      this.shadowRoot
        .querySelector(".m-operation-list")
        .addEventListener("mouseenter", function(e) {
          if (self.listCloseDelay) {
            clearTimeout(self.listCloseDelay);
            self.listCloseDelay = null;
          }
        });
      this.shadowRoot
        .querySelector(".m-operation-list")
        .addEventListener("mouseover", function(e) {
          if (self.listCloseDelay) {
            clearTimeout(self.listCloseDelay);
            self.listCloseDelay = null;
          }
        });
    }

    addHoverState() {
      if (this.disabled) {
        return false;
      }
      if (this.listCloseDelay) {
        clearTimeout(this.listCloseDelay);
        this.listCloseDelay = null;
      }
      if (this.listStyleResetDelay) {
        clearTimeout(this.listStyleResetDelay);
        this.listStyleResetDelay = null;
      }
      this.shadowRoot
        .querySelector(".m-operation-tip .arrow")
        .classList.add("arrow-rotate");
      let optionLength = Array.from(this.querySelectorAll("m-operation"))
        .length;
      this.shadowRoot
        .querySelector(".m-operation-list")
        .classList.add("active");
      this.shadowRoot.querySelector(".m-operation-list").style.height =
        optionLength * 30 + 4 + 8 * 2 + "px";
      this.calcWidthAndPosition();
      this.shadowRoot.querySelector(".m-operation-list").style.zIndex = 999;
    }

    removeHoverState() {
      let self = this;
      this.shadowRoot
        .querySelector(".m-operation-tip .arrow")
        .classList.remove("arrow-rotate");
      this.shadowRoot.querySelector(".m-operation-list").style.height = 0;
      this.shadowRoot
        .querySelector(".m-operation-list")
        .classList.remove("active");
      this.listStyleResetDelay = setTimeout(function() {
        self.resetListStyle();
      }, 300);
    }

    resetListStyle() {
      this.shadowRoot.querySelector(".m-operation-list").style.padding =
        "0 8px";
      this.shadowRoot.querySelector(".m-operation-list").style.zIndex = 0;
    }

    calcLabelSize(operationWidth) {
      // 计算列表宽度
      let self = this;
      if (self.operationWidth == undefined) {
        self.operationWidth = 0;
      }
      self.operationWidth =
        self.operationWidth > operationWidth
          ? self.operationWidth
          : operationWidth;
      this.shadowRoot.querySelector(".m-operation-list").style.width =
        self.operationWidth + 32 + "px";
    }

    calcWidthAndPosition() {
      let self = this;
      self.operationWidth = Math.max(self.operationWidth, this.offsetWidth);
      this.shadowRoot.querySelector(".m-operation-list").style.width =
        self.operationWidth + "px";
      let componentPosition = self.getBoundingClientRect();
      let position = {
        top: componentPosition.top + componentPosition.height,
        left: componentPosition.left - 8,
        bottom: window.innerHeight - componentPosition.top,
        right:
          window.innerWidth -
          componentPosition.width -
          componentPosition.left -
          8
      };
      let optionListHeight = parseInt(
        this.shadowRoot
          .querySelector(".m-operation-list")
          .style.height.replace("px")
      );
      if (position.top + optionListHeight + 20 >= window.innerHeight) {
        this.shadowRoot.querySelector(".m-operation-list").style.top = null;
        this.shadowRoot.querySelector(".m-operation-list").style.bottom =
          position.bottom + "px";
        this.shadowRoot.querySelector(".m-operation-list").classList =
          "m-operation-list rotate";
        this.shadowRoot.querySelector(".m-operation-list").style.padding =
          "8px 8px 12px";
      } else {
        this.shadowRoot.querySelector(".m-operation-list").style.bottom = null;
        this.shadowRoot.querySelector(".m-operation-list").style.top =
          position.top + "px";
        this.shadowRoot.querySelector(".m-operation-list").classList =
          "m-operation-list";
        this.shadowRoot.querySelector(".m-operation-list").style.padding =
          "12px 8px 8px";
      }
      if (position.left + self.operationWidth >= window.innerWidth) {
        this.shadowRoot.querySelector(".m-operation-list").style.left = null;
        this.shadowRoot.querySelector(".m-operation-list").style.right =
          position.right + "px";
      } else {
        this.shadowRoot.querySelector(".m-operation-list").style.right = null;
        this.shadowRoot.querySelector(".m-operation-list").style.left =
          position.left + "px";
      }
      self.listHeight = this.shadowRoot.querySelector(
        ".operation-list > div"
      ).clientHeight;
      let listHeight = self.listHeight;
      let listAllHeight = this.fullListHeight;
      if (listAllHeight > listHeight) {
        let barHeight = parseInt((listHeight * listHeight) / listAllHeight);
        self.shadowRoot.querySelector(".scroll-bar").style.height =
          barHeight + "px";
      }
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
        this.shadowRoot.querySelector(".m-operation").classList.add("disabled");
      } else {
        this.removeAttribute("disabled");
        this.shadowRoot
          .querySelector(".m-operation")
          .classList.remove("disabled");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }
  }

  // m-function 定义
  class mFunction extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 获取值
      let self = this;
      let iconClass = this.getAttribute("icon-class");
      let icon = this.getAttribute("icon");
      let tip = this.getAttribute("tip");
      // icon 和 iconClass 同时存在的验证
      if (icon != undefined && iconClass != undefined) {
        this.removeAttribute("icon");
      }
      // 创建 shadowDOM
      let shadow = null;
      if (!!this.shadowRoot) {
        shadow = this.shadowRoot;
      } else {
        shadow = this.attachShadow({
          mode: "open"
        });
        shadow.resetStyleInheritance = true; // 重置样式
      }
      let disabled = this.hasAttribute("disabled"); // 禁用状态
      let html = `
        <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
        <style type="text/css">
          :host(m-function) {
            cursor: pointer;
            position: relative;
          }
          :host(m-function) .m-function {
            width: 32px;
            height: 32px;
            line-height: 32px;
            display: inline-flex;
            align-items: center;
            position: relative;
          }
          :host(m-function) .m-function .m-function-content {
            width: fit-content;
            height: 32px;
            color: var(--m-function-color, #fff);
            font-size: 14px;
            border-radius: 16px;
            background-color: var(--m-function-bg, #0359ff);
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            position: absolute;
            top: 0;
            left: 0;
          }
          :host(m-function) .m-function .m-function-content .m-function-tip {
            width: 0;
            padding-right: 0;
            white-space: nowrap;
            overflow: hidden;
            transition: all 200ms linear;
          }
          :host(m-function) .m-function.disabled .m-function-content,
          :host(m-function:hover) .m-function.disabled .m-function-content {
            color: var(--m-function-disable-color, #8f8f8f);
            background-color: var(--m-function-disable-bg, #e9e9e9);
            cursor: not-allowed;
          }
          :host(m-function:hover) .m-function:not(.disabled) .m-function-content {
            box-shadow: rgba(0,0,0,0.25) 4px 4px 10px;
          }
          :host(m-function:hover) .m-function:not(.disabled) .m-function-content .m-function-tip {
            padding-right: 12px;
          }
          :host(m-function) .m-function .m-function-content i {
            width: 32px;
            font-size: 16px;
            text-align: center;
            line-height: 1;
          }
          :host(m-function) .m-function .m-function-content .visible-tip {
            width: fit-content;
            white-space: nowrap;
          }
      </style>
      <div class="m-function${disabled ? " disabled" : ""}">&nbsp;
        <div class="m-function-content">
          <i class="m-iconfont ${
            iconClass ? iconClass : icon ? "" : "icon-ios-help-circle-outl"
          }">${icon ? icon : ""}</i>
          <div class="m-function-tip">${tip ? tip : ""}</div>
          <div class="visible-tip">${tip ? tip : ""}</div>
        </div>
      </div>
      `;
      shadow.innerHTML = html;
      this.tipWidth = this.shadowRoot.querySelector(".visible-tip").clientWidth;
      this.shadowRoot.querySelector(".visible-tip").remove();
      this.addEventListener("mouseenter", this.mouseEnterListener);
      this.addEventListener("mouseleave", this.mouseLeaveListener);
      this.addEventListener("click", function(e) {
        if (self.disabled) {
          // 禁用判断
          return false;
        }
        let operation = this.getAttribute("operation");
        let param = {
          obj: self,
          event: e
        };
        let operationName = operation ? operation.replace(/\((.)*\)/g, "") : "";
        let paramStr = "";
        if (operation) {
          try {
            if (eval(`typeof ${operationName} != "function"`)) {
              throw new Error();
            }
            if (
              new RegExp(/\(/).test(operation) &&
              new RegExp(/\)/).test(operation)
            ) {
              paramStr = operation
                .match(new RegExp(/\((.)*\)/))[0]
                .replace("(", "")
                .replace(")", "");
            }
            eval(`${operationName}.apply(param, [${paramStr}])`);
          } catch (e) {
            let error = {
              name: "m-function",
              message: `function <${operationName}> is not defined`
            };
            mError.apply(error, [self]);
          }
        } else {
          let error = {
            name: "m-function",
            message: `function <${operationName}> is not defined`
          };
          mError.apply(error, [self]);
        }
      });
    }

    mouseEnterListener() {
      if (this.disabled) {
        return false;
      }
      if (this.resetZIndex) {
        // 清除时间差导致的z-index重置延迟
        clearTimeout(this.resetZIndex);
        this.resetZIndex = null;
      }
      // 清除容器内所有m-function的z-index延迟并手动重置
      Array.from(this.parentNode.querySelectorAll("m-function")).forEach(
        function(node) {
          if (node.resetZIndex) {
            clearTimeout(node.resetZIndex);
            node.resetZIndex = null;
          }
          node.shadowRoot.querySelector(".m-function-content").style.zIndex =
            "auto";
        }
      );
      // 设置层级并设置展开的宽度
      this.shadowRoot.querySelector(".m-function-content").style.zIndex = "999";
      this.shadowRoot.querySelector(".m-function-tip").style.width =
        this.tipWidth + "px";
    }

    mouseLeaveListener() {
      let self = this;
      this.shadowRoot.querySelector(".m-function-tip").style.width = 0; // 将提示内容隐藏
      this.resetZIndex = setTimeout(function() {
        // 设置 z-index 的延时重置
        self.shadowRoot.querySelector(".m-function-content").style.zIndex =
          "auto";
      }, 300);
    }

    set operation(value) {
      if (value) {
        this.setAttribute("operation", value);
        this.initComponent();
      } else {
        this.removeAttribute("operation");
      }
    }

    get operation() {
      this.getAttribute("operation");
    }

    set tip(value) {
      if (value) {
        this.setAttribute("tip", value);
        this.initComponent();
      } else {
        this.removeAttribute("tip");
      }
    }

    get tip() {
      this.getAttribute("tip");
    }

    set iconClass(value) {
      if (value) {
        this.setAttribute("icon-class", value);
        this.initComponent();
      } else {
        this.removeAttribute("icon-class");
      }
    }

    get iconClass() {
      this.getAttribute("icon-class");
    }

    set icon(value) {
      if (value) {
        this.setAttribute("icon", value);
        this.initComponent();
      } else {
        this.removeAttribute("icon");
      }
    }

    get icon() {
      return this.getAttribute("icon");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
        this.shadowRoot.querySelector(".m-function").classList.add("disabled");
      } else {
        this.removeAttribute("disabled");
        this.shadowRoot
          .querySelector(".m-function")
          .classList.remove("disabled");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }
  }

  // m-icon-function 定义
  class mIconFunction extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 获取值
      let self = this;
      let iconClass = this.getAttribute("icon-class");
      let icon = this.getAttribute("icon");
      let tip = this.getAttribute("tip");
      // icon 和 iconClass 同时存在的验证
      if (icon != undefined && iconClass != undefined) {
        this.removeAttribute("icon");
      }
      // 创建 shadowDOM
      let shadow = null;
      if (!!this.shadowRoot) {
        shadow = this.shadowRoot;
      } else {
        shadow = this.attachShadow({
          mode: "open"
        });
        shadow.resetStyleInheritance = true; // 重置样式
      }
      let disabled = this.hasAttribute("disabled"); // 禁用状态
      let html = `
        <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
        <style type="text/css">
          :host(m-icon-function) {
            cursor: pointer;
            position: relative;
          }
          :host(m-icon-function) .m-function {
            width: 32px;
            height: 32px;
            line-height: 32px;
            display: inline-flex;
            align-items: center;
            position: relative;
          }
          :host(m-icon-function) .m-function .m-function-content {
            width: fit-content;
            height: 32px;
            color: var(--m-icon-function-color, #333);
            font-size: 14px;
            border-radius: 16px;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
          :host(m-icon-function:hover) .m-function:not(.disabled) .m-function-content {
            color: var(--m-icon-function-active-color, #0359ff);
            background-color: var(--m-icon-function-active-bg, #e9e9e9);
          }
          :host(m-icon-function) .m-function.disabled .m-function-content,
          :host(m-icon-function:hover) .m-function.disabled .m-function-content {
            color: var(--m-icon-function-disable-color, #8f8f8f);
            cursor: not-allowed;
          }
          :host(m-icon-function) .m-function .m-function-content i {
            width: 32px;
            font-size: 20px;
            line-height: 1;
            text-align: center;
          }
          :host(m-icon-function) .m-function .m-function-content .visible-tip {
            width: fit-content;
            font-size: 12px;
            white-space: nowrap;
            visibility: hidden;
            position: absolute;
          }
          :host(m-icon-function) .m-function .m-function-tip {
            width: fit-content;
            display: none;
            position: fixed;
            z-index: 999;
          }
          :host(m-icon-function) .m-function-up .m-function-tip {
            top: -37px;
          }
          :host(m-icon-function) .m-function-down .m-function-tip {
            top: 37px;
          }
          :host(m-icon-function:hover) .m-function-up:not(.disabled) .m-function-tip-up,
          :host(m-icon-function:hover) .m-function-down:not(.disabled) .m-function-tip-down {
            display: block;
          }
          :host(m-icon-function) .m-function .m-function-tip .black-arrow{
            width: 8px;
            height: 4px;
            background-image: url("${url}images/select_arrow_black.png");
            background-repeat: no-repeat;
            display: block;
            margin: 0 auto;
          }
          :host(m-icon-function) .m-function .m-function-tip-up .black-arrow {
            transform: rotate(180deg);
          }
          :host(m-icon-function) .m-function .m-function-tip .tip-content {
            width: fit-content;
            padding: 8px;
            color: var(--m-icon-function-tip-color, #fff);
            font-size: 12px;
            line-height: 1;
            border-radius: 3px;
            background-color: var(--m-icon-function-tip-bg, #000);
            box-shadow: rgba(0,0,0,0.25) 4px 4px 10px;
            display: block;
          }
        </style>
        <div class="m-function${disabled ? " disabled" : ""}">
          <div class="m-function-content">
            <i class="m-iconfont ${
              iconClass ? iconClass : icon ? "" : "icon-ios-help-circle-outl"
            }">${icon ? icon : ""}</i>
            <div class="visible-tip">${tip ? tip : ""}</div>
          </div>
          <div class="m-function-tip m-function-tip-up">
            <span class="tip-content">${tip ? tip : ""}</span>
            <span class="black-arrow"></span>
          </div>
          <div class="m-function-tip m-function-tip-down">
            <span class="black-arrow"></span>
            <span class="tip-content">${tip ? tip : ""}</span>
          </div>
        </div>
      `;
      shadow.innerHTML = html;
      // this.shadowRoot.querySelector(".visible-tip").remove();
      this.addEventListener("mouseenter", this.mouseEnterListener);
      this.addEventListener("click", function(e) {
        if (self.disabled) {
          // 禁用判断
          return false;
        }
        let operation = this.getAttribute("operation");
        let param = {
          obj: self,
          event: e
        };
        let operationName = operation ? operation.replace(/\((.)*\)/g, "") : "";
        let paramStr = "";
        if (operation) {
          try {
            if (eval(`typeof ${operationName} != "function"`)) {
              throw new Error();
            }
            if (
              new RegExp(/\(/).test(operation) &&
              new RegExp(/\)/).test(operation)
            ) {
              paramStr = operation
                .match(new RegExp(/\((.)*\)/))[0]
                .replace("(", "")
                .replace(")", "");
            }
            eval(`${operationName}.apply(param, [${paramStr}])`);
          } catch (e) {
            let error = {
              name: "m-icon-function",
              message: `function <${operationName}> is not defined`
            };
            mError.apply(error, [self]);
          }
        } else {
          let error = {
            name: "m-icon-function",
            message: `function <${operationName}> is not defined`
          };
          mError.apply(error, [self]);
        }
      });
    }

    mouseEnterListener() {
      if (this.disabled) {
        return false;
      }
      if (!this.hasAttribute("tip")) {
        return false;
      }
      let tipWidth =
        this.shadowRoot.querySelector(".visible-tip").clientWidth + 16;
      this.shadowRoot.querySelector(".m-function-tip-up").style.width =
        tipWidth + "px";
      this.shadowRoot.querySelector(".m-function-tip-down").style.width =
        tipWidth + "px";
      let componentPosition = this.getBoundingClientRect();
      let top = componentPosition.y;
      if (top && top > 80) {
        this.shadowRoot
          .querySelector(".m-function")
          .classList.remove("m-function-down");
        this.shadowRoot
          .querySelector(".m-function")
          .classList.add("m-function-up");
        this.shadowRoot.querySelector(
          ".m-function .m-function-tip-up"
        ).style.top = componentPosition.y - 37 + "px";
        this.shadowRoot.querySelector(
          ".m-function .m-function-tip-up"
        ).style.left =
          componentPosition.x - tipWidth / 2 + this.offsetWidth / 2 + "px";
      } else {
        this.shadowRoot
          .querySelector(".m-function")
          .classList.remove("m-function-up");
        this.shadowRoot
          .querySelector(".m-function")
          .classList.add("m-function-down");
        this.shadowRoot.querySelector(
          ".m-function .m-function-tip-down"
        ).style.top = componentPosition.y + this.offsetHeight + 5 + "px";
        this.shadowRoot.querySelector(
          ".m-function .m-function-tip-down"
        ).style.left =
          componentPosition.x - tipWidth / 2 + this.offsetWidth / 2 + "px";
      }
    }

    set operation(value) {
      if (value) {
        this.setAttribute("operation", value);
        this.initComponent();
      } else {
        this.removeAttribute("operation");
      }
    }

    get operation() {
      this.getAttribute("operation");
    }

    set tip(value) {
      if (value) {
        this.setAttribute("tip", value);
        this.initComponent();
      } else {
        this.removeAttribute("tip");
      }
    }

    get tip() {
      this.getAttribute("tip");
    }

    set iconClass(value) {
      if (value) {
        this.setAttribute("icon-class", value);
        this.initComponent();
      } else {
        this.removeAttribute("icon-class");
      }
    }

    get iconClass() {
      this.getAttribute("icon-class");
    }

    set icon(value) {
      if (value) {
        this.setAttribute("icon", value);
        this.initComponent();
      } else {
        this.removeAttribute("icon");
      }
    }

    get icon() {
      return this.getAttribute("icon");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
        this.shadowRoot.querySelector(".m-function").classList.add("disabled");
      } else {
        this.removeAttribute("disabled");
        this.shadowRoot
          .querySelector(".m-function")
          .classList.remove("disabled");
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }
  }

  // m-menu-item 定义
  class mMenuItem extends HTMLElement {
    constructor() {
      super();
      this.initVerification();
      this.initComponent();
    }

    initVerification() {
      // 合法性验证
      if (this.parentNode.nodeName != "M-MENU-GROUP") {
        let param = {
          name: "m-menu-item",
          message: "m-menu-item must be wrapped by <m-menu-group>"
        };
        mError.apply(param, [this]);
      }
    }

    initComponent() {
      // 组件初始化
      this.style.display = "block";
      let disabled = this.hasAttribute("disabled");
      if (disabled) {
        this.classList.add("disabled");
      }
      this.addEventListener("click", this.clickEventListener);
    }

    clickEventListener(e) {
      if (this.classList.contains("active")) {
        // 菜单已经激活
        return false;
      }
      if (this.parentNode.disabled || this.disabled) {
        // 菜单组或菜单已禁用
        return false;
      }
      let self = this;
      let menuItemList = Array.from(
        this.parentNode.querySelectorAll("m-menu-item")
      );
      menuItemList.forEach(function(menuItem) {
        if (menuItem.classList.contains("active")) {
          menuItem.classList.remove("active");
        }
      });
      this.classList.add("active");
      if (this.menuRoute) {
        if (this.parentNode.parentNode.menuTarget) {
          if (layer) {
            self.parentNode.parentNode.loading = layer.load(2, {
              shade: [0.3, "#000"]
            });
          }
          self.parentElement.parentElement.changeEvent.menuTarget = self;
          self.parentElement.parentElement.dispatchEvent(
            self.parentElement.parentElement.changeEvent
          );
          if (this.parentNode.parentNode.menuTarget.nodeName == "IFRAME") {
            this.parentNode.parentNode.menuTarget.setAttribute(
              "src",
              this.menuRoute
            );
            if (!this.parentNode.parentNode.menuTarget.attachEvent) {
              this.parentNode.parentNode.menuTarget.onload = this.parentNode.parentNode.clearLoading.apply(
                this.parentNode.parentNode,
                []
              );
            }
          } else {
            fly
              .get(this.menuRoute)
              .then(function(response) {
                if (response.status == 200) {
                  let originStr = response.data
                    .toString()
                    .replace(/\r|\n|\\s/g, "");
                  let linkList = Array.from(
                    originStr.match(new RegExp(/<link((?!<>).)*>/g)) || []
                  );
                  let styleList = Array.from(
                    originStr.match(
                      new RegExp(/<style((?!<\/style>).)*<\/style>/g)
                    ) || []
                  );
                  let scriptList = Array.from(
                    originStr.match(
                      new RegExp(/<script((?!<\/script>).)*<\/script>/g)
                    ) || []
                  );
                  let bodyHtml = originStr.match(
                    new RegExp(/<body>(.)*<\/body>/)
                  )[0];
                  linkList.forEach(function(link) {
                    let linkEle = document.createElement("link");
                    let href = link.match(new RegExp(/href="[^>]*"/g));
                    linkEle.setAttribute("rel", "stylesheet");
                    linkEle.setAttribute("type", "text/css");
                    if (href && href[0]) {
                      linkEle.setAttribute(
                        "href",
                        href[0].replace('href="', "").replace('"', "")
                      );
                    }
                    self.parentNode.parentNode.menuTarget.appendChild(linkEle);
                  });
                  styleList.forEach(function(style) {
                    let styleEle = document.createElement("style");
                    let content = style
                      .replace(/<style[^>]*>/g, "")
                      .replace("</style>", "");
                    styleEle.setAttribute("type", "text/css");
                    if (content) {
                      styleEle.appendChild(document.createTextNode(content));
                    }
                    self.parentNode.parentNode.menuTarget.appendChild(styleEle);
                  });
                  if (bodyHtml) {
                    bodyHtml = bodyHtml
                      .replace("<body>", "")
                      .replace("</body>", "");
                  }
                  bodyHtml = bodyHtml.replace(
                    /<script((?!<\/script>).)*<\/script>/g,
                    ""
                  );
                  self.parentNode.parentNode.menuTarget.innerHTML += bodyHtml;
                  insertScript(
                    scriptList,
                    self.parentNode.parentNode.menuTarget
                  );
                }
              })
              .catch(function(error) {
                let param = {
                  name: "m-menu-item",
                  message: `${self.menuRoute} has an error`
                };
                mError.apply(param, [self, error]);
              })
              .finally(function() {
                if (layer && self.parentNode.parentNode.loading) {
                  layer.close(self.parentNode.parentNode.loading);
                }
              });
          }
        }
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }

    get menuRoute() {
      return this.getAttribute("menu-route");
    }

    set menuRoute(value) {
      if (value) {
        this.setAttribute("menu-route", value);
      } else {
        this.removeAttribute("menu-route");
      }
    }
  }

  // m-menu-group 定义
  class mMenuGroup extends HTMLElement {
    constructor() {
      super();
      this.initVerification();
      this.initComponent();
    }

    initVerification() {
      // 合法性验证
      if (this.parentNode.nodeName != "M-MENU") {
        let param = {
          name: "m-menu-group",
          message: "m-menu-group must be wrapped by <m-menu>"
        };
        mError.apply(param, [this]);
      }
    }

    initComponent() {
      // 组件初始化
      let icon = {
        content: this.getAttribute("icon") || "",
        type: new RegExp(/^(\&\#)(.)*(;)$/).test(this.getAttribute("icon"))
          ? "unicode"
          : "class"
      };
      let name = this.getAttribute("group-name") || "";
      let disabled = this.hasAttribute("disabled");
      let shadowRoot = null;
      if (this.shadowRoot) {
        shadowRoot = this.shadowRoot;
      } else {
        shadowRoot = this.attachShadow({
          mode: "open"
        });
        shadowRoot.resetStyleInheritance = true; // 重置样式
      }
      if (disabled) {
        this.classList.add("disabled");
      }
      let html = `
        <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
        <style type="text/css">
        :host(m-menu-group) {
            height: 50px;
            overflow: hidden;
            transition: height .3s linear;
            display: block;
        }
        :host(m-menu-group.active),
        :host(m-menu-group:hover) {
            background-color: var(--m-menu-group-active-bg, #f3f3f3);
        }
        :host(m-menu-group[disabled]:hover) {
            background: none;
        }
        :host(m-menu-group) .m-menu-group {
            width: 100%;
            height: 50px;
            color: var(--m-menu-group-color, #333);
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        :host(m-menu-group[disabled]) .m-menu-group {
            color: var(--m-menu-group-disable-color, #c8c8c8);
            cursor: not-allowed;
        }
        :host(m-menu-group) .m-menu-group .group-icon {
            width: 24px;
            height: 24px;
            font-size: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-left: 50px;
        }
        :host(m-menu-group) .m-menu-group .group-icon i {
            font-size: 24px;
            line-height: 1;
        }
        :host(m-menu-group.active) .m-menu-group .group-icon,
        :host(m-menu-group:hover) .m-menu-group .group-icon {
            color: var(--m-menu-group-icon-active-color, #0359ff);
        }
        :host(m-menu-group) .m-menu-group .group-name {
            width: calc(100% - 100px);
            white-space: nowrap;
            font-size: 16px;
            font-weight: bolder;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-left: 24px;
        }
        :host(m-menu-group.active) .m-menu-group .group-name,
        :host(m-menu-group:hover) .m-menu-group .group-name {
            color: var(--m-menu-group-active-color, #000);
        }
        :host(m-menu-group[disabled]:hover) .m-menu-group .group-icon,
        :host(m-menu-group[disabled]:hover) .m-menu-group .group-name  {
            color: var(--m-menu-group-icon-disable-color, #c8c8c8);
        }
        :host(m-menu-group) ::slotted(m-menu-item)  {
            width: 100%;
            height: 50px;
            padding-left: 120px;
            color: var(--m-menu-item-color, #333);
            white-space: nowrap;
            font-size: 16px;
            line-height: 50px;
            text-overflow: ellipsis;
            cursor: pointer;
            overflow: hidden;
            display: block;
            box-sizing: border-box;
        }
        :host(m-menu-group) ::slotted(m-menu-item:hover),
        :host(m-menu-group) ::slotted(m-menu-item.active) {
            color: var(--m-menu-item-active-color, #0359ff);
        }
        :host(m-menu-group) ::slotted(m-menu-item[disabled]),
        :host(m-menu-group) ::slotted(m-menu-item[disabled]:hover) {
            color: var(--m-menu-item-disable-color, #c8c8c8);
            cursor: not-allowed;
        }
        </style>
        <div class="m-menu-group ${disabled ? "disabled" : ""}">
            <div class="group-icon">
                <i class="m-iconfont ${
                  icon.type == "class" ? icon.content : ""
                }">${icon.type == "unicode" ? icon.content : ""}</i>
            </div>
            <div class="group-name">${name}</div>
        </div>
        <slot class="m-menu-items"></slot>
      `;
      shadowRoot.innerHTML = html;
      this.addEventListener("click", this.clickEventListener);
    }

    clickEventListener(e) {
      if (this.classList.contains("active")) {
        // 菜单已经激活
        return false;
      }
      if (this.disabled) {
        // 菜单已禁用
        return false;
      }
      let self = this;
      // 清除所有二级菜单的激活样式
      let menuItemList = Array.from(
        this.parentElement.querySelectorAll("m-menu-item")
      );
      menuItemList.forEach(function(menuItem) {
        if (menuItem.classList.contains("active")) {
          menuItem.classList.remove("active");
        }
      });
      // 清除其余菜单组的激活样式
      let menuGroupList = Array.from(
        this.parentElement.querySelectorAll("m-menu-group")
      );
      menuGroupList.forEach(function(menuGroup) {
        if (menuGroup.classList.contains("active")) {
          menuGroup.style.height = "50px";
          menuGroup.classList.remove("active");
        }
      });
      this.classList.add("active");
      let listNumber = Array.from(this.querySelectorAll("m-menu-item")).length;
      if (listNumber) {
        this.style.height = 50 * (listNumber + 1) + "px";
        this.querySelector("m-menu-item:not([disabled])").click();
      } else {
        if (this.menuRoute) {
          if (this.parentNode.menuTarget) {
            if (layer) {
              self.parentNode.loading = layer.load(2, { shade: [0.3, "#000"] });
            }
            self.parentElement.changeEvent.menuTarget = self;
            self.parentElement.dispatchEvent(self.parentElement.changeEvent);
            if (this.parentNode.menuTarget.nodeName == "IFRAME") {
              this.parentNode.menuTarget.setAttribute("src", this.menuRoute);
              if (!this.parentNode.menuTarget.attachEvent) {
                this.parentNode.menuTarget.onload = this.parentNode.clearLoading.apply(
                  this.parentNode,
                  []
                );
              }
            } else {
              fly
                .get(this.menuRoute)
                .then(function(response) {
                  if (response.status == 200) {
                    let originStr = response.data
                      .toString()
                      .replace(/\r|\n|\\s/g, "");
                    let linkList = Array.from(
                      originStr.match(new RegExp(/<link((?!<>).)*>/g)) || []
                    );
                    let styleList = Array.from(
                      originStr.match(
                        new RegExp(/<style((?!<\/style>).)*<\/style>/g)
                      ) || []
                    );
                    let scriptList = Array.from(
                      originStr.match(
                        new RegExp(/<script((?!<\/script>).)*<\/script>/g)
                      ) || []
                    );
                    let bodyHtml = originStr.match(
                      new RegExp(/<body>(.)*<\/body>/)
                    )[0];
                    linkList.forEach(function(link) {
                      let linkEle = document.createElement("link");
                      let href = link.match(new RegExp(/href="[^>]*"/g));
                      linkEle.setAttribute("rel", "stylesheet");
                      linkEle.setAttribute("type", "text/css");
                      if (href && href[0]) {
                        linkEle.setAttribute(
                          "href",
                          href[0].replace('href="', "").replace('"', "")
                        );
                      }
                      self.parentNode.parentNode.menuTarget.appendChild(
                        linkEle
                      );
                    });
                    styleList.forEach(function(style) {
                      let styleEle = document.createElement("style");
                      let content = style
                        .replace(/<style[^>]*>/g, "")
                        .replace("</style>", "");
                      styleEle.setAttribute("type", "text/css");
                      if (content) {
                        styleEle.appendChild(document.createTextNode(content));
                      }
                      self.parentNode.parentNode.menuTarget.appendChild(
                        styleEle
                      );
                    });
                    if (bodyHtml) {
                      bodyHtml = bodyHtml
                        .replace("<body>", "")
                        .replace("</body>", "");
                    }
                    bodyHtml = bodyHtml.replace(
                      /<script((?!<\/script>).)*<\/script>/g,
                      ""
                    );
                    self.parentNode.parentNode.menuTarget.innerHTML += bodyHtml;
                    insertScript(
                      scriptList,
                      self.parentNode.parentNode.menuTarget
                    );
                  }
                })
                .catch(function(error) {
                  let param = {
                    name: "m-menu-item",
                    message: `${self.menuRoute} has an error`
                  };
                  mError.apply(param, [self, error]);
                })
                .finally(function() {
                  if (layer && self.parentNode.loading) {
                    layer.close(self.parentNode.loading);
                  }
                });
            }
          }
        }
      }
    }

    get icon() {
      return this.getAttribute("icon");
    }

    set icon(value) {
      if (value) {
        this.setAttribute("icon", value);
        let icon = {
          content: value,
          type: new RegExp(/^(\&\#)(.)*(;)$/).test(value) ? "unicode" : "class"
        };
        let html = `
                <i class="m-iconfont ${
                  icon.type == "class" ? icon.content : ""
                }">${icon.type == "unicode" ? icon.content : ""}</i>
                `;
        this.shadowRoot.querySelector(".group-icon").innerHTML = html;
      } else {
        this.removeAttribute("icon");
        this.shadowRoot.querySelector(".group-icon").innerHTML = "";
      }
    }

    get groupName() {
      return this.getAttribute("group-name");
    }

    set groupName(value) {
      if (value) {
        this.setAttribute("group-name", value);
        this.shadowRoot.querySelector(".group-name").innerHTML = value;
      } else {
        this.removeAttribute("group-name");
        this.shadowRoot.querySelector(".group-name").innerHTML = "";
      }
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }

    get menuRoute() {
      return this.getAttribute("menu-route");
    }

    set menuRoute(value) {
      if (value) {
        this.setAttribute("menu-route", value);
      } else {
        this.removeAttribute("menu-route");
      }
    }
  }

  // m-menu 定义
  class mMenu extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 组件初始化
      this.style.display = "block";
      let target = this.getAttribute("menu-target");
      if (!(target && document.querySelector(`#${target}`))) {
        let param = {
          name: "m-menu",
          message: `not specify <menu-target> yet or element <#${target}> not defined`
        };
        mWarn.apply(param, [this]);
      } else {
        let targetNode = document.querySelector(`#${target}`);
        if (targetNode.nodeName == "IFRAME") {
          if (targetNode.attachEvent) {
            targetNode.detachEvent("onload", this.clearLoading.call(this));
            targetNode.attachEvent("onload", this.clearLoading.call(this));
          }
        }
      }
      this.changeEvent = document.createEvent("Event");
      this.changeEvent.initEvent("change", false, false);
    }

    clearLoading() {
      try {
        if (layer && this.loading) {
          layer.close(this.loading);
          this.loading = null;
        }
      } catch (e) {
        return false;
      }
    }

    get menuTarget() {
      let target = this.getAttribute("menu-target");
      if (this.hasAttribute("menu-target") && target) {
        return document.querySelector(`#${target}`);
      } else {
        return undefined;
      }
    }

    set menuTarget(value) {
      if (value) {
        this.setAttribute("menu-target", value);
      } else {
        this.removeAttribute("menu-target");
      }
      if (!(value && document.querySelector(`#${value}`))) {
        let param = {
          name: "m-menu",
          message: `not specified <menu-target> yet or element <#${value}> not defined`
        };
        mWarn.apply(param, [this]);
      } else {
        let targetNode = document.querySelector(`#${target}`);
        if (targetNode.nodeName == "IFRAME") {
          if (targetNode.attachEvent) {
            targetNode.detachEvent("onload", this.clearLoading.call(this));
            targetNode.attachEvent("onload", this.clearLoading.call(this));
          }
        }
      }
    }
  }

  // m-inner-cell 定义
  class mInnerCell extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 初始化组件
      this.style.display = "flex";
      this.style.width = "fit-content";
    }

    get dataSet() {
      return this.data;
    }

    set dataSet(data) {
      this.data = data;
    }
  }

  // m-table 定义
  class mTable extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 初始化组件
      let self = this;
      let shadowRoot = null;
      if (this.shadowRoot) {
        shadowRoot = this.shadowRoot;
      } else {
        shadowRoot = this.attachShadow({
          mode: "open"
        });
        shadowRoot.resetStyleInheritance = true; // 重置样式
      }
      let shadowContent = `
        <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
        <style type="text/css">
        :host(m-table) {
            width: fit-content;
            min-width: 300px;
            max-width: 100%;
            font-size: 14px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
            margin: 0 auto;
        }
        :host(m-table) .table-body {
            width: fit-content;
            min-width: 100%;
            min-height: 100px;
            overflow: auto;
        }
        :host(m-table) .table-body .table-header {
            width: fit-content;
            min-width: 100%;
            background-color: #dfe8fb;
            border-bottom: 1px solid #ebeff2;
        }
        :host(m-table) .table-header .main-table-header {
            width: fit-content;
        }
        :host(m-table) .table-body .table-main {
            width: fit-content;
            min-width: 100%;
            overflow: auto;
            background-color: #fff;
            display: flex;
            flex-direction: column;
        }
        :host(m-table) .table-body.error,
        :host(m-table) .table-body.empty {
            width: 100%;
        }
        :host(m-table) .table-body.error > .table-main,
        :host(m-table) .table-body.empty > .table-main {
            width: 100%;
            min-height: 320px;
            background-color: #f5f5f5;
        }
        :host(m-table) .table-body.error .error,
        :host(m-table) .table-body.empty .empty {
            height: 100%;
        }
        :host(m-table) .table-body.empty .fixed-table,
        :host(m-table) .table-body.error .fixed-table {
            display: none;
        }
        :host(m-table) .table-main .error,
        :host(m-table) .table-main .empty {
            width: 100%;
            height: 0;
            color: #9f9f9f;
            font-size: 20px;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        :host(m-table) .table-main .error i,
        :host(m-table) .table-main .empty i {
            font-size: 120px;
        }
        :host(m-table) .table-main .error i {
            color: #dd5454;
        }
        :host(m-table) .table-main .error div:not(:first-child),
        :host(m-table) .table-main .empty div:not(:first-child) {
            margin-top: 30px;
        }
        :host(m-table) .table-body .fixed-body {
            width: fit-content;
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
        }
        :host(m-table) .table-body .fixed-body.more {
            box-shadow: -4px 0px 4px rgba(0,0,0,.1);
        }
        :host(m-table) .fixed-body .fixed-table-header {
            width: fit-content;
            background-color: #dfe8fb;
            border-bottom: 1px solid #ebeff2;
        }
        :host(m-table) .fixed-body .fixed-table {
            width: fit-content;
            overflow: auto;
            background-color: #fff;
        }
        :host(m-table) .table-footer {
            width: 100%;
            height: 62px;
            padding: 15px 30px;
            box-sizing: border-box;
            background-color: #fff;
        }
        </style>
        <div class="table-body">
            <div class="table-header">
                <slot name="main-table-header"></slot>
            </div>
            <div class="table-main">
                <div>
                  <slot name="main-table"></slot>
                </div>
                <div class="error">
                    <div><i class="m-iconfont ming-icon-bug"></i></div>
                    <div>组件内部出现错误，请审查</div>
                </div>
                <div class="empty">
                    <div><i class="m-iconfont ming-icon-cloud-fail"></i></div>
                    <div>数据不见啦，空空如也~</div>
                </div>
            </div>
            <div class="fixed-body">
                <div class="fixed-table-header">
                    <slot name="fixed-table-header"></slot>
                </div>
                <div class="fixed-table">
                    <slot name="fixed-table"></slot>
                </div>
            </div>
        </div>
        <div class="table-footer">
            <slot name="table-footer"></slot>
        </div>
    `;
      shadowRoot.innerHTML = shadowContent;
      let observer = new MutationObserver(function() {
        syncFixedTable.call(self);
      });
      observer.observe(self, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["style", "clientWidth", "offsetWidth"]
      });
      this.addEventListener("mouseover", function() {
        syncFixedTable.call(self);
      });
      window.addEventListener("resize", function() {
        syncFixedTable.call(self);
      });
      this.shadowRoot
        .querySelector(".table-main")
        .addEventListener("mousewheel", function(e) {
          e.preventDefault();
          let top = self.shadowRoot.querySelector(".table-main").scrollTop;
          let scrollStep = 50;
          let result = 0;
          let maxScroll =
            self.shadowRoot.querySelector(".table-main").scrollHeight -
            self.shadowRoot.querySelector(".table-main").clientHeight;
          if (e.deltaY > 0) {
            // 向下滚动滚轮
            result =
              top + scrollStep > maxScroll ? maxScroll : top + scrollStep;
            self.shadowRoot.querySelector(".table-main").scrollTo({
              top: result,
              behavior: "smooth"
            });
          } else {
            // 向上滚动
            result = top - scrollStep > 0 ? top - scrollStep : 0;
          }
          ScrollTop(self.shadowRoot.querySelector(".table-main"), result, 80);
          ScrollTop(self.shadowRoot.querySelector(".fixed-table"), result, 80);
          syncFixedTable.call(self);
        });
      this.shadowRoot
        .querySelector(".fixed-table")
        .addEventListener("mousewheel", function(e) {
          e.preventDefault();
          let top = self.shadowRoot.querySelector(".table-main").scrollTop;
          let scrollStep = 50;
          let result = 0;
          let maxScroll =
            self.shadowRoot.querySelector(".table-main").scrollHeight -
            self.shadowRoot.querySelector(".table-main").clientHeight;
          if (e.deltaY > 0) {
            // 向下滚动滚轮
            result =
              top + scrollStep > maxScroll ? maxScroll : top + scrollStep;
          } else {
            // 向上滚动
            result = top - scrollStep > 0 ? top - scrollStep : 0;
          }
          ScrollTop(self.shadowRoot.querySelector(".table-main"), result, 150);
          ScrollTop(self.shadowRoot.querySelector(".fixed-table"), result, 150);
        });
      this.shadowRoot
        .querySelector(".fixed-table")
        .addEventListener("scroll", function(e) {
          e.preventDefault();
          self.shadowRoot.querySelector(
            ".table-main"
          ).scrollTop = self.shadowRoot.querySelector(".fixed-table").scrollTop;
          syncFixedTable.call(self);
        });
    }

    register(config) {
      // 配置m-table格式
      configMingTable.apply(this, [config]);
    }

    render() {
      // 渲染数据表格
      renderMingTable.apply(this);
    }

    destroy() {
      // 销毁所有表格内容
      this.shadowRoot.querySelector(".table-body").classList = "table-body";
      delete this.config;
      Array.from(this.children).forEach(function(item) {
        item.remove();
      });
    }

    showError() {
      this.hideEmpty();
      this.config.error = true;
      this.shadowRoot.querySelector(".table-body").classList.add("error");
    }

    hideError() {
      delete this.config.error;
      this.shadowRoot.querySelector(".table-body").classList = "table-body";
    }

    showEmpty() {
      this.hideError();
      this.config.empty = true;
      this.shadowRoot.querySelector(".table-body").classList.add("empty");
    }

    hideEmpty() {
      delete this.config.empty;
      this.shadowRoot.querySelector(".table-body").classList = "table-body";
    }

    getOption(option) {
      switch (option) {
        case "pageSize":
          return this.config.pageSize;
          break;
        case "pageNumber":
          return this.config.pageNumber;
          break;
        case "columns":
          return this.config.columns;
          break;
        case "error":
          return !!this.config.error;
          break;
        case "empty":
          return !!this.config.empty;
          break;
        default:
          return undefined;
      }
    }

    setOption(option, value) {
      switch (option) {
        case "pageSize":
          if (value != null && typeof value === "number") {
            this.config.pageNumber = 1;
            this.config.pageSize = value;
            this.render();
          }
          break;
        case "pageNumber":
          if (value != null && typeof value === "number") {
            this.config.pageNumber = value;
            this.render();
          }
          break;
        case "success":
          if (value != null && typeof value === "function") {
            this.config.success = value;
            this.render();
          }
          break;
        case "error":
          if (value != null && typeof value === "function") {
            this.config.error = value;
            this.render();
          }
          break;
        case "refresh":
          if (this.config) {
            this.render();
          }
          break;
        case "reload":
          if (this.config) {
            this.render();
          }
          break;
        case "previous":
          if (
            this.config &&
            this.config.pageNumber &&
            typeof this.config.pageNumber === "number" &&
            this.config.pageNumber > 1
          ) {
            this.config.pageNumber--;
            this.render();
          }
          break;
        case "next":
          if (
            this.config &&
            this.config.pageNumber &&
            this.config.maxPageNumber &&
            typeof this.config.pageNumber === "number" &&
            typeof this.config.maxPageNumber === "number" &&
            this.config.pageNumber < this.config.maxPageNumber
          ) {
            this.config.pageNumber++;
            this.render();
          }
          break;
        case "first":
          if (
            this.config &&
            this.config.pageNumber &&
            typeof this.config.pageNumber === "number" &&
            this.config.pageNumber != 1
          ) {
            this.config.pageNumber = 1;
            this.render();
          }
          break;
        case "last":
          if (
            this.config &&
            this.config.pageNumber &&
            this.config.maxPageNumber &&
            typeof this.config.pageNumber === "number" &&
            typeof this.config.maxPageNumber === "number" &&
            this.config.pageNumber < this.config.maxPageNumber
          ) {
            this.config.pageNumber = this.config.maxPageNumber;
            this.render();
          }
          break;
        default:
          return undefined;
      }
    }
  }

  // m-simple-table 定义
  class mSimpleTable extends HTMLElement {
    constructor() {
      super();
      this.initComponent();
    }

    initComponent() {
      // 初始化组件
      let self = this;
      let shadowRoot = null;
      if (this.shadowRoot) {
        shadowRoot = this.shadowRoot;
      } else {
        shadowRoot = this.attachShadow({
          mode: "open"
        });
        shadowRoot.resetStyleInheritance = true; // 重置样式
      }
      let shadowContent = `
        <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
        <style type="text/css">
        :host(m-simple-table) {
          width: fit-content;
          min-width: 300px;
          max-width: 100%;
          font-size: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          margin: 0 auto;
        }
        :host(m-simple-table) .table-body {
          width: calc(100% - 80px);
          min-height: 100px;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 4px 4px 10px rgba(0, 0, 0, .1);
          margin: 0 auto;
        }
        :host(m-simple-table) .table-body .table-header {
          width: 100%;
          background-color: #eef2f6;
        }
        :host(m-simple-table) .table-body .table-main {
          width: 100%;
          overflow-y: auto;
          background-color: #fff;
          display: flex;
          flex-direction: column;
        }
        :host(m-simple-table) .table-body.error,
        :host(m-simple-table) .table-body.empty {
          width: 100%;
        }
        :host(m-simple-table) .table-body.error > .table-main,
        :host(m-simple-table) .table-body.empty > .table-main {
          width: 100%;
          min-height: 320px;
          background-color: #f5f5f5;
        }
        :host(m-simple-table) .table-body.error .error,
        :host(m-simple-table) .table-body.empty .empty {
          height: 100%;
        }
        :host(m-simple-table) .table-main .error,
        :host(m-simple-table) .table-main .empty {
          width: 100%;
          height: 0;
          color: #9f9f9f;
          font-size: 20px;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        :host(m-simple-table) .table-main .error i,
        :host(m-simple-table) .table-main .empty i {
          font-size: 120px;
        }
        :host(m-simple-table) .table-main .error i {
          color: #dd5454;
        }
        :host(m-simple-table) .table-main .error div:not(:first-child),
        :host(m-simple-table) .table-main .empty div:not(:first-child) {
          margin-top: 30px;
        }
        :host(m-simple-table) .table-footer {
          width: 100%;
          height: 62px;
          padding: 20px 0;
          box-sizing: border-box;
        }
        </style>
        <div class="table-body">
            <div class="table-header">
                <slot name="main-table-header"></slot>
            </div>
            <div class="table-main">
                <div>
                  <slot name="main-table"></slot>
                </div>
                <div class="error">
                    <div><i class="m-iconfont ming-icon-bug"></i></div>
                    <div>组件内部出现错误，请审查</div>
                </div>
                <div class="empty">
                    <div><i class="m-iconfont ming-icon-cloud-fail"></i></div>
                    <div>数据不见啦，空空如也~</div>
                </div>
            </div>
        </div>
        <div class="table-footer">
            <slot name="table-footer"></slot>
        </div>
      `;
      shadowRoot.innerHTML = shadowContent;
      let observer = new MutationObserver(function() {
        syncFixedTable.call(self);
      });
      observer.observe(self, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["style", "clientWidth", "offsetWidth"]
      });
      this.addEventListener("mouseover", function() {
        syncFixedTable.call(self);
      });
      window.addEventListener("resize", function() {
        syncFixedTable.call(self);
      });
    }

    register(config) {
      // 配置m-table格式
      configMingTable.apply(this, [config]);
    }

    render() {
      // 渲染数据表格
      renderMingTable.apply(this);
    }

    destroy() {
      // 销毁所有表格内容
      this.shadowRoot.querySelector(".table-body").classList = "table-body";
      delete this.config;
      Array.from(this.children).forEach(function(item) {
        item.remove();
      });
    }

    showError() {
      this.hideEmpty();
      this.config.error = true;
      this.shadowRoot.querySelector(".table-body").classList.add("error");
    }

    hideError() {
      delete this.config.error;
      this.shadowRoot.querySelector(".table-body").classList = "table-body";
    }

    showEmpty() {
      this.hideError();
      this.config.empty = true;
      this.shadowRoot.querySelector(".table-body").classList.add("empty");
    }

    hideEmpty() {
      delete this.config.empty;
      this.shadowRoot.querySelector(".table-body").classList = "table-body";
    }

    getOption(option) {
      switch (option) {
        case "pageSize":
          return this.config.pageSize;
          break;
        case "pageNumber":
          return this.config.pageNumber;
          break;
        case "columns":
          return this.config.columns;
          break;
        case "error":
          return !!this.config.error;
          break;
        case "empty":
          return !!this.config.empty;
          break;
        default:
          return undefined;
      }
    }

    setOption(option, value) {
      switch (option) {
        case "pageSize":
          if (value != null && typeof value === "number") {
            this.config.pageNumber = 1;
            this.config.pageSize = value;
            this.render();
          }
          break;
        case "pageNumber":
          if (value != null && typeof value === "number") {
            this.config.pageNumber = value;
            this.render();
          }
          break;
        case "success":
          if (value != null && typeof value === "function") {
            this.config.success = value;
            this.render();
          }
          break;
        case "error":
          if (value != null && typeof value === "function") {
            this.config.error = value;
            this.render();
          }
          break;
        case "refresh":
          if (this.config) {
            this.render();
          }
          break;
        case "reload":
          if (this.config) {
            this.render();
          }
          break;
        case "previous":
          if (
            this.config &&
            this.config.pageNumber &&
            typeof this.config.pageNumber === "number" &&
            this.config.pageNumber > 1
          ) {
            this.config.pageNumber--;
            this.render();
          }
          break;
        case "next":
          if (
            this.config &&
            this.config.pageNumber &&
            this.config.maxPageNumber &&
            typeof this.config.pageNumber === "number" &&
            typeof this.config.maxPageNumber === "number" &&
            this.config.pageNumber < this.config.maxPageNumber
          ) {
            this.config.pageNumber++;
            this.render();
          }
          break;
        case "first":
          if (
            this.config &&
            this.config.pageNumber &&
            typeof this.config.pageNumber === "number" &&
            this.config.pageNumber != 1
          ) {
            this.config.pageNumber = 1;
            this.render();
          }
          break;
        case "last":
          if (
            this.config &&
            this.config.pageNumber &&
            this.config.maxPageNumber &&
            typeof this.config.pageNumber === "number" &&
            typeof this.config.maxPageNumber === "number" &&
            this.config.pageNumber < this.config.maxPageNumber
          ) {
            this.config.pageNumber = this.config.maxPageNumber;
            this.render();
          }
          break;
        default:
          return undefined;
      }
    }
  }

  window.customElements.define("m-select", mSelect); // m-select注册
  window.customElements.define("m-option", mOption); // m-option注册
  window.customElements.define("m-input", mInput); // m-input注册
  window.customElements.define("m-file", mFile); // m-file注册
  window.customElements.define("m-date", mDate); // m-date注册
  window.customElements.define("m-color", mColor); // m-date注册
  window.customElements.define("m-switch", mSwitch); // m-switch注册
  window.customElements.define("m-tag", mTag); // m-tag注册
  window.customElements.define("m-form-item", mFormItem); // m-form-item注册
  window.customElements.define("m-operation-list", mOperationList); // m-option注册
  window.customElements.define("m-operation", mOperation); // m-operation注册
  window.customElements.define("m-function", mFunction); // m-function注册
  window.customElements.define("m-icon-function", mIconFunction); // m-function注册
  window.customElements.define("m-menu-item", mMenuItem); // m-menu-item 注册
  window.customElements.define("m-menu-group", mMenuGroup); // m-menu-group 注册
  window.customElements.define("m-menu", mMenu); // m-menu 注册
  window.customElements.define("m-inner-cell", mInnerCell); // m-table 注册
  window.customElements.define("m-table", mTable); // m-table 注册
  window.customElements.define("m-simple-table", mSimpleTable); // m-simple-table 注册
})();
