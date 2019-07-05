/**
 * @desc ming-ui.js
 * @author Quarter
 * @date 2019.04.25
 * @version 0.0.1
 */

!async function() {
    // 检测是否为 http 协议
    if (window.location.protocol.indexOf("http") == -1) {
        let info = {
            name: "ming.js",
            message: "Due to the use of dynamic loading, you must run the program on the server"
        };
        mError.apply(info, []);
        return false;
    }

    // 引入必需的iconfont
    let url = "";
    let scriptArray = Array.from(document.querySelectorAll("script"));
    scriptArray.forEach(function(scriptNode) {
        let src = scriptNode.hasAttribute("src") ?
            scriptNode.getAttribute("src").toString() :
            "";
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
                rootObject.insertBefore(oStyle, document.querySelector("head style") || null);
            }
        },
        createStyleContent: function(rootObject, styleContent) {
            //导入文件
            if (rootObject != null) {
                let oStyle = document.createElement("style");
                oStyle.setAttribute("rel", "stylesheet");
                oStyle.setAttribute("type", "text/css");
                oStyle.innerHTML = styleContent;
                rootObject.insertBefore(oStyle, document.querySelector("head style") || null);
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
    // 引入 shadow-dom.js
    if (body.length) {
        syncLoadDependency.loadScript(body[0], `${url}shadow/shadow-dom.js`);
    } else {
        syncLoadDependency.loadScript(
            document.documentElement,
            `${url}shadow/shadow-dom.js`
        );
    }

    // 判断是否重复加载或定义
    if (
        customElements.get("m-select") ||
        customElements.get("m-option") ||
        customElements.get("m-input") ||
        customElements.get("m-file") ||
        customElements.get("m-date") ||
        customElements.get("m-color") ||
        customElements.get("m-switch") ||
        customElements.get("m-slider") ||
        customElements.get("m-range-slider") ||
        customElements.get("m-tag") ||
        customElements.get("m-form-item") ||
        customElements.get("m-album-item") ||
        customElements.get("m-album") ||
        customElements.get("m-operation-list") ||
        customElements.get("m-operation") ||
        customElements.get("m-function") ||
        customElements.get("m-icon-function") ||
        customElements.get("m-menu-item") ||
        customElements.get("m-menu-group") ||
        customElements.get("m-menu") ||
        customElements.get("m-table") ||
        customElements.get("m-simple-table") ||
        customElements.get("m-inner-cell")
    ) {
        return false;
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
    const browserScrollBarWidth = getScrollBarWidth();

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
        let spacingIndex = time / spacingTime; // 计算循环的次数
        let nowTop = obj.scrollTop; // 获取当前滚动条位置
        let everTop = (number - nowTop) / spacingIndex; // 计算每次滑动的距离
        let scrollTimer = setInterval(() => {
            if (spacingIndex > 0) {
                spacingIndex--;
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
                    value: pageTypeIcon ?
                        '<i class="m-iconfont ming-icon-first"></i>' : "首页"
                });
                pageSelector.push({
                    disable: firstStatus,
                    active: false,
                    target: "previous-page",
                    value: pageTypeIcon ?
                        '<i class="m-iconfont ming-icon-previous"></i>' : "上一页"
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
                    value: pageTypeIcon ?
                        '<i class="m-iconfont ming-icon-next"></i>' : "下一页"
                });
                pageSelector.push({
                    disable: lastStatus,
                    active: false,
                    target: "last-page",
                    value: pageTypeIcon ?
                        '<i class="m-iconfont ming-icon-last"></i>' : "尾页"
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
            let containerBodyHeight = containerHeight - tableFooter.offsetHeight;
            let tableHeaderHeight = mainHeader.offsetHeight;
            let tableBodyHeight = containerBodyHeight - tableHeaderHeight;
            if (
                tableBody.style.height ||
                container.clientHeight >
                tableBody.offsetHeight + tableFooter.offsetHeight ||
                tableBody.scrollHeight > tableBody.offsetHeight
            ) {
                // 校准表格容器高度
                tableBody.style.height = containerBodyHeight + "px";
                let widthScroll = false;
                if (tableBody.clientWidth < tableBody.scrollWidth) {
                    widthScroll = true;
                }
                if (container.nodeName == "M-TABLE") {
                    fixedBody.style.height =
                        containerBodyHeight -
                        (widthScroll ? browserScrollBarWidth : 0) +
                        "px";
                }
                // 校准表格主体高度
                mainBody.style.height =
                    tableBodyHeight - (widthScroll ? browserScrollBarWidth : 0) + "px";
                if (container.nodeName == "M-TABLE") {
                    fixedTable.style.height =
                        tableBodyHeight - (widthScroll ? browserScrollBarWidth : 0) + "px";
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
                        tdNode.nextElementSibling == null ?
                        35 :
                        30;
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
            this.style.cssText = "width: intrinsic; width: -moz-max-content; width: -webkit-max-content; padding: 0 !important; display: table-cell;";
            let optionWidth = this.scrollWidth;
            this.style.cssText = "";
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
            this.parentElement.shrinkList();
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
                nodeArray.length > 0 ?
                nodeArray[nodeArray.length - 1] :
                this.querySelector(`m-option`);
            for (let i = 0, len = nodeArray.length; i < len - 1; i++) {
                nodeArray[i].removeAttribute("selected");
            }
            if (nodeSelected && !nodeSelected.hasAttribute("selected")) {
                nodeSelected.setAttribute("selected", "");
            }
            let html = /*html*/ `
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
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    :host(m-select) .m-select.disabled,
                    :host(m-select) .m-select.active.disabled {
                        color:  var(--m-select-disable-color, #c8c8c8);
                        cursor: not-allowed;
                    }
                    :host(m-select) .m-select:not(.disabled):hover,
                    :host(m-select) .m-select.active {
                        color: var(--m-select-active-color, #000);
                    }
                    :host(m-select) .m-select span,
                    :host(m-select) .m-select i {
                        line-height: 1;
                    }
                    :host(m-select) .m-select span {
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
                        width: -moz-fit-content;
                        width: fit-content;
                        max-width: 240px;
                        height: fit-content;
                        padding: 0;
                        border-radius: 4px;
                        position: fixed;
                        z-index: 0;
                    }
                    :host(m-select) .m-select-option.active {
                        border: var(--m-select-border, 1px solid #e4e7ed);
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                    }
                    :host(m-select) .m-select-option .option-list {
                        width: 100%;
                        height: 0;
                        padding: 0;
                        list-style: none;
                        overflow: hidden;
                        border-radius: 4px;
                        background: #fff;
                        box-sizing: border-box;
                        transition: height .3s ease, padding .2s linear;
                        position: relative;
                    }
                    :host(m-select) .m-select-option.active .option-list {
                        padding: 8px 0;
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
                        cursor: pointer;
                        border-radius: 3px;
                        background: rgba(144,147,153,.3);
                        position: absolute;
                        top: 0;
                        right: 2px;
                        margin-top: 8px;
                    }
                    :host(m-select) .m-select-option .option-list .scroll-bar:hover {
                        background: rgba(144,147,153,.5);
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
                        background: var(--m-option-active-bg, #f3f3f3);
                    }
                    :host(m-select) .m-select-option ::slotted(m-option[disabled]),
                    :host(m-select) .m-select-option ::slotted(m-option[disabled]:hover) {
                        color: var(--m-option-disable-color, #c8c8c8);
                        background: none;
                        cursor: not-allowed;
                    }
                    :host(m-select) .m-select-option .arrow,
                    :host(m-select) .m-select-option .arrow::after {
                        width: 0;
                        height: 0;
                        border-width: 6px;
                        border-color: transparent;
                        border-style: solid;
                        border-top-width: 0;
                        border-bottom-color: #ebeef5;
                        filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
                        display: none;
                        position: absolute;
                        top: -7px;
                        left: 40px;
                    }
                    :host(m-select) .m-select-option.right .arrow {
                        left: auto;
                        right: 40px;
                    }
                    :host(m-select) .m-select-option.active .arrow,
                    :host(m-select) .m-select-option.active .arrow::after {
                        display: block;
                    }
                    :host(m-select) .m-select-option .arrow::after {
                        content: " ";
                        border-top-width: 0;
                        border-bottom-color: #fff;
                        margin-left: -6px;
                        top: 1px;
                        left: 0;
                    }
                    :host(m-select) .m-select-option.rotate .arrow,
                    :host(m-select) .m-select-option.rotate .arrow::after {
                        border-top-width: 6px;
                        border-bottom-width: 0;
                        border-top-color: #ebeef5;
                        border-bottom-color: transparent;
                        top: auto;
                        bottom: -6px;
                    }
                    :host(m-select) .m-select-option.rotate .arrow::after {
                        border-top-width: 6px;
                        border-bottom-width: 6px;
                        border-top-color: #fff;
                        border-bottom-color: transparent;
                    }
                </style>
                <div class="m-select${disabled ? " disabled" : ""}">
                    <span>${nodeSelected ? nodeSelected.innerHTML || " " : " "}</span>
                    <i class="m-iconfont ming-icon-arrow-down"></i>
                </div>
                <div class="m-select-option">
                    <div class="option-list">
                        <div><slot></slot></div>
                        <div class="scroll-bar"></div>
                    </div>
                    <div class="arrow"></div>
                </div>
            `;
            shadow.innerHTML = html;
            self.changeEvent = document.createEvent("Event");
            self.changeEvent.initEvent("change", false, false);
            self.eventHandler(); // 事件处理
        }

        eventHandler() {
            // 事件处理
            let self = this;
            // 下拉框点击事件
            this.shadowRoot.querySelector(".m-select").addEventListener("click", function(e) {
                self.clickHandler();
            });
            // 页面点击监听
            document.addEventListener("click", function(e) {
                let obj = e.target;
                if (self.active && obj.nodeName != "M-SELECT" && obj.nodeName != "M-OPTION") {
                    self.shrinkList();
                }
            });
            // 页面滚轮监听（webkit）
            document.addEventListener("mousewheel", function(e) {
                let obj = e.target;
                if (self.active && obj.nodeName != "M-SELECT" && obj.nodeName != "M-OPTION") {
                    self.shrinkList();
                }
            });
            // 页面滚轮监听（firefox）
            document.addEventListener("DOMMouseScroll", function(e) {
                let obj = e.target;
                if (self.active && obj.nodeName != "M-SELECT" && obj.nodeName != "M-OPTION") {
                    self.shrinkList();
                }
            });
            // 移除组建内冒泡和默认事件（webkit）
            this.addEventListener("mousewheel", function(e) {
                e.stopPropagation();
                e.cancelBubble = true;
                e.preventDefault();
                e.returnValue = false;
            });
            // 移除组建内冒泡和默认事件（firefox）
            this.addEventListener("DOMMouseScroll", function(e) {
                e.stopPropagation();
                e.cancelBubble = true;
                e.preventDefault();
                e.returnValue = false;
            });
            // 选单内滚轮事件（webkit）
            this.shadowRoot.querySelector(".m-select-option").addEventListener("mousewheel", function(e) {
                e.preventDefault();
                self.listScrollHandler(e); // 滚动事件处理
                return false;
            });
            // 选单内滚轮事件（firefox）
            this.shadowRoot.querySelector(".m-select-option").addEventListener("DOMMouseScroll", function(e) {
                e.preventDefault();
                self.listScrollHandler(e); // 滚动事件处理
                return false;
            });
            // 滑块 mousedown 事件
            self.shadowRoot.querySelector(".option-list .scroll-bar").addEventListener("mousedown", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                self.drag = true; // 开始拖拽
                let target = self.shadowRoot.querySelector(".option-list div"); // 获取当前内容的scrollTop
                let currentTop = parseInt(this.style.top.replace(/px/g, "") || 0); // 当前的滑块位置
                self.startY = e.clientY; // 记录开始拖拽的鼠标位置
                self.startScroll = target.scrollTop; // 记录开始的滚动位置
                self.startTop = currentTop; // 记录滑块的位置
            });
            // 滑块容器 mousemove 事件
            self.shadowRoot.querySelector(".m-select-option").addEventListener("mousemove", function(e) {
                if (!self.drag) { // 尚未进入拖拽
                    return false;
                }
                let diff = e.clientY - self.startY; // 当前的变化值
                let list = self.shadowRoot.querySelector(".option-list div"); // 获取列表
                let bar = this.querySelector(".scroll-bar"); // 获取滑块
                let totalDistance = this.querySelector(".option-list").offsetHeight - this.querySelector(".scroll-bar").offsetHeight - 16; // 可以滑动的总距离
                let totalScroll = this.querySelector(".option-list > div").scrollHeight - this.querySelector(".option-list").offsetHeight + 16; // 可以滚动的总距离
                let nextTop = self.startTop + diff; // 滑到的位置
                if (totalScroll <= 0 || nextTop > totalDistance || nextTop < 0) { // 已经超过距离
                    return false;
                }
                bar.style.top = nextTop + "px"; // 定位滑块位置
                list.scrollTop = parseInt((nextTop / totalDistance) * totalScroll); // 滚动位置
            });
            // 滑块容器 mouseup 事件
            self.addEventListener("mouseup", function(e) {
                self.drag = false; // 拖拽停止
            });
            // 鼠标移出选单范围事件
            self.shadowRoot.querySelector(".m-select-option").addEventListener("mouseleave", function(e) {
                self.drag = false; // 拖拽停止
            });
        }

        resetSelect() {
            let nodeArray = Array.from(this.querySelectorAll("m-option[selected]"));
            let nodeSelected =
                nodeArray.length > 0 ?
                nodeArray[nodeArray.length - 1] :
                this.querySelector(`m-option`);
            for (let i = 0, len = nodeArray.length; i < len - 1; i++) {
                nodeArray[i].removeAttribute("selected");
            }
            if (nodeSelected && !nodeSelected.hasAttribute("selected")) {
                nodeSelected.setAttribute("selected", "");
            }
            this.shadowRoot.querySelector(".m-select span").innerHTML = nodeSelected ?
                nodeSelected.innerHTML || " " :
                " ";
        }

        clickHandler() {
            // 点击事件处理
            let self = this;
            if (self.active) { // 已经激活
                self.shrinkList();
            } else { // 还没有激活
                self.expandList();
            }
        }

        expandList() {
            // 展开列表
            if (this.disabled) {
                return false;
            }
            if (this.listStyleResetDelay) {
                clearTimeout(this.listStyleResetDelay);
                this.listStyleResetDelay = null;
            }
            this.shadowRoot.querySelector(".m-select").classList.add("active");
            this.shadowRoot.querySelector(".m-select-option").classList.add("active");
            this.shadowRoot
                .querySelector(".m-select i")
                .classList.add("arrow-rotate");
            let optionLength = Array.from(this.querySelectorAll("m-option")).length;
            this.fullListHeight = optionLength * 30;
            let listHeight = Math.min(this.fullListHeight, 180);
            this.shadowRoot.querySelector(".m-select-option .option-list").style.height =
                listHeight + 4 + 8 * 2 + "px";
            this.calcWidthAndPosition();
            this.shadowRoot.querySelector(".m-select-option").style.zIndex = 999;
            this.active = true;
        }

        shrinkList() {
            // 收缩列表
            let self = this;
            self.shadowRoot.querySelector(".m-select").classList.remove("active");
            self.shadowRoot.querySelector(".m-select-option").classList.remove("active");
            self.shadowRoot
                .querySelector(".m-select i")
                .classList.remove("arrow-rotate");
            self.shadowRoot.querySelector(".m-select-option .option-list").style.height = 0;
            self.active = false;
            self.listStyleResetDelay = setTimeout(function() {
                self.resetListStyle();
            }, 300);
        }

        listScrollHandler(e) {
            // 列表内滚轮事件
            let self = this;
            let target = self.shadowRoot.querySelector(".option-list div");
            let bar = self.shadowRoot.querySelector(".option-list .scroll-bar");
            let top = target.scrollTop;
            let scrollStep = 50;
            let result = 0;
            let maxScroll = target.scrollHeight - target.clientHeight;
            if (e.deltaY > 0 || e.detail > 0) {
                // 向下滚动滚轮
                result =
                    top + scrollStep > maxScroll ? maxScroll : top + scrollStep;
            } else {
                // 向上滚动
                result = top - scrollStep > 0 ? top - scrollStep : 0;
            }
            ScrollTop(target, result, 150, bar);
        }

        resetListStyle() {
            this.shadowRoot.querySelector(".m-select-option").style.zIndex = 0;
        }

        calcLabelSize(optionWidth) {
            let self = this;
            let selectStyle = window.getComputedStyle(this);
            if (self.optionWidth == undefined) {
                self.operationWidth = 0;
            }
            self.optionWidth = Math.max(self.optionWidth, optionWidth);
            if (selectStyle.getPropertyValue("--m-select-width") == "") {
                this.shadowRoot.querySelector(".m-select").style.width =
                    self.optionWidth + 32 + "px";
            }
        }

        calcWidthAndPosition() {
            let self = this;
            let selectStyle = window.getComputedStyle(this.shadowRoot.querySelector(".m-select"));
            let selectWidth = new RegExp(/px/).test(selectStyle.getPropertyValue("--m-select-width")) ?
                parseFloat(selectStyle.getPropertyValue("--m-select-width").replace(/px/g, "")) : 0;
            let tipWidth = self.shadowRoot.querySelector(".m-select").offsetWidth;
            self.optionWidth = Math.max(self.optionWidth || 0, tipWidth, selectWidth);
            this.shadowRoot.querySelector(".m-select-option").style.width =
                self.optionWidth + "px";
            let componentPosition = self.getBoundingClientRect();
            let position = {
                top: componentPosition.top + componentPosition.height + 10,
                left: componentPosition.left,
                bottom: window.innerHeight - componentPosition.top + 10,
                right: window.innerWidth -
                    componentPosition.width -
                    componentPosition.left
            };
            let optionListHeight = parseInt(
                this.shadowRoot
                .querySelector(".m-select-option .option-list")
                .style.height.replace("px")
            );
            if (position.top + optionListHeight + 20 >= window.innerHeight) {
                this.shadowRoot.querySelector(".m-select-option").style.top = null;
                this.shadowRoot.querySelector(".m-select-option").style.bottom =
                    position.bottom + "px";
                this.shadowRoot.querySelector(".m-select-option").classList.add("rotate");
            } else {
                this.shadowRoot.querySelector(".m-select-option").style.bottom = null;
                this.shadowRoot.querySelector(".m-select-option").style.top =
                    position.top + "px";
                this.shadowRoot.querySelector(".m-select-option").classList.remove("rotate")
            }
            if (position.left + self.optionWidth >= window.innerWidth) {
                this.shadowRoot.querySelector(".m-select-option").style.left = null;
                this.shadowRoot.querySelector(".m-select-option").style.right =
                    position.right + "px";
                this.shadowRoot.querySelector(".m-select-option").classList.add("right");
            } else {
                this.shadowRoot.querySelector(".m-select-option").style.right = null;
                this.shadowRoot.querySelector(".m-select-option").style.left =
                    position.left + "px";
                this.shadowRoot.querySelector(".m-select-option").classList.remove("right");
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
            let maxLength = this.getAttribute("maxlength") || "16";
            let placeholder = this.getAttribute("placeholder") || "";
            let disabled = this.hasAttribute("disabled");
            let value = this.getAttribute("value") || "";
            let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
            shadow.resetStyleInheritance = true; // 重置样式
            let html = /*html*/ `
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
                        background: var(--m-input-active-border-color, #0359ff);
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
                <input type="${inputType}" maxlength=${maxLength} value="${value}" placeholder="${placeholder}" ${
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

        set disabled(value) {
            if (value) {
                this.setAttribute("disabled", "");
                this.shadowRoot.querySelector("input").setAttribute("disabled", "");
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
            let html = /*html*/ `
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
                        background: rgba(3,89,255,.1);
                        display: inline-flex;
                        position: relative;
                    }
                    :host(m-file) a:hover {
                        color: #fff;
                        background: var(--m-file-color, #0359ff);
                    }
                    :host(m-file[disabled]) a {
                        color: #8f8f8f;
                        cursor: not-allowed;
                        border-color: #8f8f8f;
                        background: rgba(143,143,143,.1);
                    }
                    :host(m-file[disabled]) a:hover {
                        color: #8f8f8f;
                        background: rgba(143,143,143,.1);
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
            let html = /*html*/ `
                <style type="text/css">
                    :host(m-switch) {
                        width: -moz-fit-content;
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
                        background: #f9f9f9;
                        transition: background .3s linear;
                    }
                    :host(m-switch) .switch.active {
                        background: #75d991;
                    }
                    :host(m-switch[disabled]) .switch {
                        background: #dfdfdf;
                    }
                    :host(m-switch) .switch .switch-label {
                        width: 22px;
                        height: 22px;
                        border-radius: 11px;
                        background: #fff;
                        box-shadow: rgba(0,0,0,.1) 0 0 3px;
                        transition: margin .3s ease-out;
                        margin: 3px 0 0 3px;
                    }
                    :host(m-switch) .switch.active .switch-label {
                        margin: 3px 0 0 25px;
                    }
                    :host(m-switch[disabled]) .switch .switch-label {
                        background: #f6f6f6;
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

    // m-slider 定义
    class mSlider extends HTMLElement {
        constructor() {
            super();
            this.initComponent();
        }

        initComponent() {
            // 组件初始化
            let self = this;
            // 取值并验证
            let value = new Number(self.getAttribute("value")) || 0; // 当前值
            let min = new Number(self.getAttribute("min")) || 0; // 值域最小值
            let max = new Number(self.getAttribute("max")) || 1; // 值域最大值
            if (max <= min) max = min + 1;
            if (value < min) value = min;
            if (value > max) value = max;
            let step = new Number(self.getAttribute("step")) || 1; // 值域变动阶级
            if (step == 0) step = 1;
            if ((max - min) % step != 0) max = min + Math.ceil((max - min) / step) * step;
            self.current = value;
            self.minValue = min;
            self.maxValue = max;
            self.stepValue = step;
            self.active = 0;
            let size = self.getAttribute("size"); // 获取尺寸大小
            let disabled = self.hasAttribute("disabled"); // 是否禁用组件
            let showInput = self.hasAttribute("show-input"); // 是否显示输入框
            let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
            shadow.resetStyleInheritance = true; // 重置样式
            // 定义组件代码结构
            let html = /*html*/ `
                <style type="text/css">
                    :host(m-slider) {
                        max-width: 1900px;
                        min-height: 38px;
                        padding: 4px 15px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    :host(m-slider) .hidden {
                        display: none !important;
                    }
                    :host(m-slider) .slider {
                        width: 100%;
                        padding: 12px 0;
                        position: relative;
                        margin: 0 auto;
                    }
                    :host(m-slider) .slider.min {
                        padding: 13px 0;
                    }
                    :host(m-slider) .slider.more {
                        width: calc(100% - 160px);
                        margin: 0;
                    }
                    :host(m-slider) .slider.min.more {
                        width: calc(100% - 120px);
                    }
                    :host(m-slider) .slider .controller {
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                        border: solid 2px #0359ff;
                        border-color: var(--m-slider-main-color, #0359ff);
                        border-radius: 10px;
                        background: var(--m-slider-auxiliary-color, #fff);
                        -webkit-user-select: none;
                        -khtml-user-select: none;
                        -moz-user-select: none;
                        -o-user-select: none;
                        user-select: none;
                        box-sizing: border-box;
                        position: absolute;
                        top: 5px;
                        left: 0;
                        z-index: 99;
                        margin-left: -10px;
                    }
                    :host(m-slider) .slider.min .controller {
                        width: 16px;
                        height: 16px;
                        border-radius: 8px;
                        top: 7px;
                        margin-left: -8px;
                    }
                    :host(m-slider[disabled]) .slider .controller {
                        cursor: not-allowed;
                        border-color: #c0c4cc;
                    }
                    :host(m-slider) .slider .controller:hover {
                        border: solid 4px #0359ff;
                        border-color: var(--m-slider-main-color, #0359ff);
                    }
                    :host(m-slider[disabled]) .slider .controller:hover {
                        border: solid 2px #c0c4cc;
                    }
                    :host(m-slider) .slider .controller .indicator {
                        display: none;
                        flex-direction: column;
                        align-items: center;
                        position: fixed;
                    }
                    :host(m-slider) .slider .controller .indicator.reverse {
                        flex-direction: column-reverse;
                    }
                    :host(m-slider) .slider .controller.active .indicator {
                        display: flex;
                    }
                    :host(m-slider) .slider .indicator .current {
                        padding: 8px 12px;
                        color: #fff;
                        font-size: 12px;
                        line-height: 1;
                        border-radius: 4px;
                        background: #303133;
                    }
                    :host(m-slider) .slider .indicator .arrow {
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 6px solid #303133;
                    }
                    :host(m-slider) .slider .indicator.reverse .arrow {
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: none;
                        border-bottom: 6px solid #303133;
                    }
                    :host(m-slider) .slider .track {
                        width: 100%;
                        height: 6px;
                        cursor: pointer;
                        border-radius: 3px;
                        background: #e4e7ed;
                        overflow: hidden;
                        position: relative;
                        margin: 0 auto;
                    }
                    :host(m-slider) .slider.min .track {
                        height: 4px;
                    }
                    :host(m-slider[disabled]) .slider .track {
                        cursor: not-allowed;
                    }
                    :host(m-slider) .slider .track .progress {
                        width: 0;
                        height: 6px;
                        background: var(--m-slider-main-color, #0359ff);
                    }
                    :host(m-slider) .slider.min .track .progress {
                        height: 4px;
                    }
                    :host(m-slider[disabled]) .slider .track .progress {
                        background: #c0c4cc;
                    }
                    :host(m-slider) .slider-input {
                        height: 30px;
                        cursor: pointer;
                        border: 1px solid #dcdfe6;
                        border-radius: 5px;
                        overflow: hidden;
                        display: flex;
                        transition: border .3s linear;
                    }
                    :host(m-slider) .slider-input.min {
                        height: 20px;
                    }
                    :host(m-slider) .slider-input:hover {
                        border-color: #bcc1cd;
                    }
                    :host(m-slider) .slider-input.active {
                        border-color: var(--m-slider-main-color, #0359ff);
                    }
                    :host(m-slider[disabled]) .slider-input:hover,
                    :host(m-slider[disabled]) .slider-input.active {
                        border-color: #dcdfe6;
                    }
                    :host(m-slider) .slider-input button {
                        width: 30px;
                        height: 30px;
                        color: #9b9ea5;
                        font-size: 20px;
                        line-height: 30px;
                        text-align: center;
                        cursor: pointer;
                        border: none;
                        outline: none;
                        background: none;
                        background: #eaeef4;
                    }
                    :host(m-slider) .slider-input.min button {
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                    }
                    :host(m-slider) .slider-input button:hover {
                        color: var(--m-slider-main-color, #0359ff);
                    }
                    :host(m-slider) .slider-input button[disabled],
                    :host(m-slider) .slider-input button[disabled]:hover,
                    :host(m-slider[disabled]) .slider-input button,
                    :host(m-slider[disabled]) .slider-input button:hover {
                        color: #c0c4cc;
                        cursor: not-allowed;
                    }
                    :host(m-slider) .slider-input input {
                        width: 70px;
                        height: 30px;
                        padding: 0 10px;
                        color: #606266;
                        line-height: 30px;
                        text-align: center;
                        cursor: pointer;
                        border: none;
                        border-left: 1px solid #dcdfe6;
                        border-right: 1px solid #dcdfe6;
                        background: var(--m-slider-auxiliary-color, #fff);
                        outline: none;
                        display: block;
                        box-sizing: border-box;
                    }
                    :host(m-slider) .slider-input.min input {
                        width: 50px;
                        height: 20px;
                        padding: 0 5px;
                        line-height: 20px;
                    }
                    :host(m-slider[disabled]) .slider-input button,
                    :host(m-slider[disabled]) .slider-input input {
                        color: #c0c4cc;
                        cursor: not-allowed;
                        background: #f5f7fa;
                    }
                </style>
                <div class="slider${showInput ? " more" : ""}${size ? " " + size : ""}">
                    <div class="controller">
                        <div class="indicator">
                            <span class="current">${value}</span>
                            <span class="arrow"></span>
                        </div>
                    </div>
                    <div class="track">
                        <div class="progress"></div>
                    </div>
                </div>
                <div class="slider-input${showInput ? "" : " hidden"}${size ? " " + size : ""}">
                    <button class="less"${min >= value || disabled ? " disabled" : ""}>-</button>
                    <input type="text" title="${value}" value="${value}"${disabled ? " disabled" : ""}>
                    <button class="more"${max <= value || disabled ? " disabled" : ""}>+</button>
                </div>
            `;
            shadow.innerHTML = html;
            self.eventProcessing(); // 调用事件处理
            self.checkInput(); // 校准 slider 数据
        }

        eventProcessing() {
            // 事件处理
            let self = this;
            // 减点击事件
            self.shadowRoot.querySelector(".slider-input .less").addEventListener("click", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (this.hasAttribute("disabled")) { // 禁用
                    return false;
                }
                let tempStep = self.active - 1; // 增加后的激活段数
                if (tempStep < 0) { // 超过了最小值
                    return false;
                }
                self.active -= 1;
                self.currentActive = self.active;
                self.calibrationSlider(); // 校准 slider 的数据
            });
            // 加点击事件
            self.shadowRoot.querySelector(".slider-input .more").addEventListener("click", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (this.hasAttribute("disabled")) { // 禁用
                    return false;
                }
                let tempStep = self.active + 1; // 增加后的激活段数
                if (tempStep * self.stepValue + self.minValue > self.maxValue) { // 超过了最大值
                    return false;
                }
                self.active += 1;
                self.currentActive = self.active;
                self.calibrationSlider(); // 校准 slider 的数据
            });
            // 输入框 keyup 事件
            self.shadowRoot.querySelector(".slider-input input").addEventListener("keyup", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (e.keyCode == 13) { // 回车
                    this.blur();
                }
            });
            // 输入框 focus 事件
            self.shadowRoot.querySelector(".slider-input input").addEventListener("focus", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.parentElement.classList.add("active"); // 添加输入框的激活状态
            });
            // 输入框 blur 事件
            self.shadowRoot.querySelector(".slider-input input").addEventListener("blur", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.parentElement.classList.remove("active"); // 移除输入框的激活状态
                self.checkInput(); // 校验数据
            });
            // 滑块容器 mouseenter 事件
            self.shadowRoot.querySelector(".slider").addEventListener("mouseenter", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.querySelector(".controller").classList.add("active");
                self.calibrationTip(); // 校准 tip 位置
            });
            // 滑块 mousedown 事件
            self.shadowRoot.querySelector(".slider .controller").addEventListener("mousedown", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                self.drag = true; // 开始拖拽
                self.startX = e.screenX; // 记录开始拖拽的鼠标位置
            });
            // 滑块容器 mousemove 事件
            // self.shadowRoot.querySelector(".slider").addEventListener("mousemove", function(e) {
            window.addEventListener("mousemove", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (!self.drag) { // 尚未拖拽
                    return false;
                }
                let diff = e.screenX - self.startX; // 拖拽距离
                let totalDiff = self.maxValue - self.minValue; // 值域范围
                let totalLen = self.shadowRoot.querySelector(".slider .track").offsetWidth; // slider 总长度
                let stepTotalCount = totalDiff / self.stepValue; // 分段数
                let stepLen = Math.floor(totalLen / stepTotalCount); // 步长对应像素长度
                if (diff % stepLen <= stepLen * 0.2 || diff % stepLen >= stepLen * 0.8) {
                    let stepCount = Math.round(diff / totalLen * stepTotalCount); // 当前变化段数
                    let realStepCount = self.active + stepCount; // 计算目前激活段数
                    if (realStepCount < 0) realStepCount = 0; // 设置最小值
                    if (realStepCount > stepTotalCount) realStepCount = stepTotalCount; // 设置最大值
                    self.currentActive = realStepCount; // 记录
                    self.calibrationSlider(); // 校准 slider 的数据
                }
            });
            // 滑块容器 mouseup 事件
            window.addEventListener("mouseup", function(e) {
                if (!self.drag) { // 尚未启用拖拽
                    return false;
                }
                self.active = self.currentActive || 0; // 获取当前激活段数
                self.drag = false; // 拖拽停止
                self.shadowRoot.querySelector(".slider .controller").classList.remove("active"); // 隐藏滑块数字
            });
            // 滑轨 click 事件
            self.shadowRoot.querySelector(".slider .track").addEventListener("click", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                let left = e.offsetX; // 偏移值
                let totalWidth = this.offsetWidth; // 滑轨总长度
                let stepCount = Math.round((self.maxValue - self.minValue) / self.stepValue); // 总阶段数
                let stepWidth = parseInt(totalWidth / stepCount); // 单阶段的宽度
                let tempStep = Math.round(left / stepWidth); // 计算激活阶段
                self.active = tempStep;
                self.currentActive = self.active;
                self.calibrationSlider(); // 校准组件数据
            });
            // 组件 mouseleave 事件
            self.addEventListener("mouseleave", function(e) {
                if (self.drag) { // 开启拖拽
                    return false;
                }
                // self.active = self.currentActive || 0; // 获取当前激活段数
                // self.drag = false; // 拖拽停止
                this.shadowRoot.querySelector(".slider .controller").classList.remove("active"); // 隐藏滑块数字
            });
        }

        calibrationTip() {
            // 校准 tip 位置
            let self = this;
            let controllerPosition = self.shadowRoot.querySelector(".slider .controller").getBoundingClientRect();
            let tipPosition = self.shadowRoot.querySelector(".slider .indicator").getBoundingClientRect();
            let left = controllerPosition.left + controllerPosition.width / 2 - tipPosition.width / 2;
            self.shadowRoot.querySelector(".slider .indicator").style.left = left + "px";
            let top = controllerPosition.top - tipPosition.height - 6;
            if (top < 0) {
                top = controllerPosition.top + controllerPosition.height + 6;
                self.shadowRoot.querySelector(".slider .indicator").classList.add("reverse");
            } else {
                self.shadowRoot.querySelector(".slider .indicator").classList.remove("reverse");
            }
            self.shadowRoot.querySelector(".slider .indicator").style.top = top + "px";
        }

        checkInput() {
            // 校验输入框的数据
            let self = this;
            let tempValue = new Number(self.shadowRoot.querySelector(".slider-input input").value.replace(/[^0-9\.\+-]/g, "") || 0); // 获取输入框的值
            // 阈值判定
            if (tempValue < self.minValue) tempValue = self.minValue;
            if (tempValue > self.maxValue) tempValue = self.maxValue;
            // 阶层校准
            let diff = tempValue - self.minValue;
            let tempStep = Math.round(diff / self.stepValue);
            self.active = tempStep;
            self.currentActive = self.active;
            self.calibrationSlider(); // 矫正数据
        }

        calibrationSlider() {
            // 校准组件数据
            let self = this;
            let totalDiff = self.maxValue - self.minValue; // 值域范围
            let stepTotalCount = totalDiff / self.stepValue; // 分段数
            // 校验步阶的合法性
            if (self.currentActive < 0) self.currentActive = 0;
            if (self.currentActive > stepTotalCount) self.currentActive = stepTotalCount;
            let stepPercent = Math.floor(100 / stepTotalCount); // 步长对应百分比
            let percent = (self.currentActive / stepTotalCount * 100).toFixed(2); // 计算百分比
            let realValue = self.minValue + self.stepValue * self.currentActive; // 当前的值
            if (realValue > self.minValue) { // 更新 - 按钮的状态
                self.shadowRoot.querySelector(".slider-input .less").removeAttribute("disabled");
            } else {
                self.shadowRoot.querySelector(".slider-input .less").setAttribute("disabled", "");
            }
            if (realValue < self.maxValue) { // 更新 + 按钮的状态
                self.shadowRoot.querySelector(".slider-input .more").removeAttribute("disabled");
            } else {
                self.shadowRoot.querySelector(".slider-input .more").setAttribute("disabled", "");
            }
            self.shadowRoot.querySelector(".slider .controller").style.left = percent + "%";
            self.shadowRoot.querySelector(".slider .controller .current").innerText = realValue;
            self.shadowRoot.querySelector(".slider-input input").value = realValue;
            self.shadowRoot.querySelector(".slider-input input").setAttribute("title", realValue);
            self.shadowRoot.querySelector(".slider .track .progress").style.width = percent + "%";
            self.calibrationTip(); // 校准 tip 位置
        }

        get disabled() {
            // 获取禁用状态
            return this.hasAttribute("disabled");
        }

        set disabled(value) {
            if (value) {
                // 禁用
                this.setAttribute("disabled", "");
                this.shadowRoot.querySelector(".slider-input button").setAttribute("disabled", "");
                this.shadowRoot.querySelector(".slider-input input").setAttribute("disabled", "");
            } else {
                // 启用
                this.removeAttribute("disabled");
                this.shadowRoot.querySelector(".slider-input input").removeAttribute("disabled");
                this.calibrationSlider();
            }
        }

        get value() {
            // 获取当前值
            let self = this;
            return self.minValue + self.active * self.stepValue;
        }

        set value(value) {
            // 设置当前值
            let self = this;
            // 阈值判定
            if (value < self.minValue) value = self.minValue;
            if (value > self.maxValue) value = self.maxValue;
            // 阶层校准
            let diff = value - self.minValue;
            let tempStep = Math.round(diff / self.step);
            self.active = tempStep;
            self.currentActive = self.active;
            self.calibrationSlider(); // 矫正数据
        }

        get min() {
            // 获取最小值
            let self = this;
            return self.minValue;
        }

        set min(value) {
            // 设置最小区间
            let self = this;
            let min = new Number(value) || 0; // 值域最小值
            if (min > self.maxValue - self.stepValue) { // 判断最小值是否合法
                return false;
            }
            self.minValue = min; // 设置最小值
            self.calibrationSlider(); // 矫正数据
        }

        get max() {
            // 获取最大值
            let self = this;
            return self.maxValue;
        }

        set max(value) {
            // 设置最大值
            let self = this;
            let max = new Number(value) || 0; // 值域最大值
            if (max < self.minValue + self.stepValue) { // 判断最大值是否合法
                return false;
            }
            self.maxValue = max; // 设置最大值
            self.calibrationSlider(); // 矫正数据
        }

        get step() {
            // 获取步长
            let self = this;
            return self.stepValue;
        }

        set step(value) {
            // 设置步长
            let self = this;
            let step = new Number(value) || 0; // 步长
            if (step > self.maxValue - self.minValue) { // 判断步长是否合法
                return false;
            }
            if (step == 0) step = 1;
            if ((self.maxValue - self.minValue) % step != 0)
                self.maxValue = self.minValue + Math.ceil((self.maxValue - self.minValue) / step) * step;
            self.stepValue = step; // 设置步长
            self.calibrationSlider(); // 矫正数据
        }
    }

    // m-range-slider 定义
    class mRangeSlider extends HTMLElement {
        constructor() {
            super();
            this.initComponent();
        }

        initComponent() {
            // 组件初始化
            let self = this;
            // 取值并验证
            let left = new Number(self.getAttribute("left")) || 0; // 当前左区间
            let right = new Number(self.getAttribute("right")) || 0; // 当前右区间
            let min = new Number(self.getAttribute("min")) || 0; // 值域最小值
            let max = new Number(self.getAttribute("max")) || 1; // 值域最大值
            if (max <= min) max = min + 1;
            if (left < min) left = min;
            if (right > max) right = max;
            let step = new Number(self.getAttribute("step")) || 1; // 值域变动阶级
            if (step == 0) step = 1;
            if ((max - min) % step != 0) max = min + Math.ceil((max - min) / step) * step;
            if (right <= left) right = left + step;
            self.left = left;
            self.right = right;
            self.minValue = min;
            self.maxValue = max;
            self.stepValue = step;
            self.leftActive = 0;
            self.rightActive = 0;
            let size = self.getAttribute("size"); // 尺寸大小
            let disabled = self.hasAttribute("disabled"); // 是否禁用组件
            let showInput = self.hasAttribute("show-input"); // 是否显示输入框
            let shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
            shadow.resetStyleInheritance = true; // 重置样式
            // 定义组件代码结构
            let html = /*html*/ `
                <style type="text/css">
                    :host(m-range-slider) {
                        max-width: 1200px;
                        min-height: 38px;
                        padding: 4px 15px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    :host(m-range-slider) .hidden {
                        display: none !important;
                    }
                    :host(m-range-slider) .slider {
                        width: 100%;
                        padding: 12px 0;
                        position: relative;
                        margin: 0 auto;
                    }
                    :host(m-range-slider) .slider.min {
                        padding: 13px 0;
                    } 
                    :host(m-range-slider) .slider.more {
                        width: calc(100% - 320px);
                        margin: 0;
                    }
                    :host(m-range-slider) .slider.min.more {
                        width: calc(100% - 220px);
                    }
                    :host(m-range-slider) .slider .controller {
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                        border: solid 2px #0359ff;
                        border-color: var(--m-slider-main-color, #0359ff);
                        border-radius: 10px;
                        background: var(--m-slider-auxiliary-color, #fff);
                        -webkit-user-select: none;
                        -khtml-user-select: none;
                        -moz-user-select: none;
                        -o-user-select: none;
                        user-select: none;
                        box-sizing: border-box;
                        position: absolute;
                        top: 5px;
                        left: 0;
                        z-index: 99;
                        margin-left: -10px;
                    }
                    :host(m-range-slider) .slider.min .controller {
                        width: 16px;
                        height: 16px;
                        border-radius: 8px;
                        top: 7px;
                        margin-left: -8px;
                    }
                    :host(m-range-slider[disabled]) .slider .controller {
                        cursor: not-allowed;
                        border-color: #c0c4cc;
                    }
                    :host(m-range-slider) .slider .controller:hover {
                        border: solid 4px #0359ff;
                        border-color: var(--m-slider-main-color, #0359ff);
                    }
                    :host(m-range-slider[disabled]) .slider .controller:hover {
                        border: solid 2px #c0c4cc;
                    }
                    :host(m-range-slider) .slider .controller .indicator {
                        display: none;
                        flex-direction: column;
                        align-items: center;
                        position: fixed;
                    }
                    :host(m-range-slider) .slider .controller .indicator.reverse {
                        flex-direction: column-reverse;
                    }
                    :host(m-range-slider) .slider .controller.active .indicator {
                        display: flex;
                    }
                    :host(m-range-slider) .slider .indicator .current {
                        padding: 8px 12px;
                        color: #fff;
                        font-size: 12px;
                        line-height: 1;
                        border-radius: 4px;
                        background: #303133;
                    }
                    :host(m-range-slider) .slider .indicator .arrow {
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 6px solid #303133;
                    }
                    :host(m-range-slider) .slider .indicator.reverse .arrow {
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: none;
                        border-bottom: 6px solid #303133;
                    }
                    :host(m-range-slider) .slider .track {
                        width: 100%;
                        height: 6px;
                        cursor: pointer;
                        border-radius: 3px;
                        background: #e4e7ed;
                        overflow: hidden;
                        position: relative;
                        margin: 0 auto;
                    }
                    :host(m-range-slider) .slider.min .track {
                        height: 4px;
                    }
                    :host(m-range-slider[disabled]) .slider .track {
                        cursor: not-allowed;
                    }
                    :host(m-range-slider) .slider .track .progress {
                        width: 0;
                        height: 6px;
                        background: var(--m-slider-main-color, #0359ff);
                        position: absolute;
                        top: 0;
                    }
                    :host(m-range-slider) .slider.min .track .progress {
                        height: 4px;
                    }
                    :host(m-range-slider[disabled]) .slider .track .progress {
                        background: #c0c4cc;
                    }
                    :host(m-range-slider) .slider-input {
                        height: 30px;
                        cursor: pointer;
                        border: 1px solid #dcdfe6;
                        border-radius: 5px;
                        overflow: hidden;
                        display: flex;
                        transition: border .3s linear;
                    }
                    :host(m-range-slider) .slider-input.min {
                        height: 20px;
                    }
                    :host(m-range-slider) .slider-input:hover {
                        border-color: #bcc1cd;
                    }
                    :host(m-range-slider) .slider-input.active {
                        border-color: var(--m-slider-main-color, #0359ff);
                    }
                    :host(m-range-slider[disabled]) .slider-input:hover,
                    :host(m-range-slider[disabled]) .slider-input.active {
                        border-color: #dcdfe6;
                    }
                    :host(m-range-slider) .slider-input button {
                        width: 30px;
                        height: 30px;
                        color: #9b9ea5;
                        font-size: 20px;
                        line-height: 30px;
                        text-align: center;
                        cursor: pointer;
                        border: none;
                        outline: none;
                        background: none;
                        background: #eaeef4;
                    }
                    :host(m-range-slider) .slider-input.min button {
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                    }
                    :host(m-range-slider) .slider-input button:hover {
                        color: var(--m-slider-main-color, #0359ff);
                    }
                    :host(m-range-slider) .slider-input button[disabled]:hover,
                    :host(m-range-slider) .slider-input button[disabled]:hover,
                    :host(m-range-slider[disabled]) .slider-input button,
                    :host(m-range-slider[disabled]) .slider-input button:hover {
                        color: #c0c4cc;
                        cursor: not-allowed;
                    }
                    :host(m-range-slider) .slider-input input {
                        width: 70px;
                        height: 30px;
                        padding: 0 10px;
                        color: #606266;
                        line-height: 30px;
                        text-align: center;
                        cursor: pointer;
                        border: none;
                        border-left: 1px solid #dcdfe6;
                        border-right: 1px solid #dcdfe6;
                        background: var(--m-slider-auxiliary-color, #fff);
                        outline: none;
                        display: block;
                        box-sizing: border-box;
                    }
                    :host(m-range-slider) .slider-input.min input {
                        width: 50px;
                        height: 20px;
                        padding: 0 5px;
                        line-height: 20px;
                    }
                    :host(m-range-slider[disabled]) .slider-input button,
                    :host(m-range-slider[disabled]) .slider-input input {
                        color: #c0c4cc;
                        cursor: not-allowed;
                        background: #f5f7fa;
                    }
                </style>
                <div class="slider-input slider-left${showInput ? "" : " hidden"}${size ? " " + size : ""}">
                    <button class="less"${min >= left || disabled ? " disabled" : ""}>-</button>
                    <input type="text" title="${left}" value="${left}"${disabled ? " disabled" : ""}>
                    <button class="more"${max <= left || left + step >= right || disabled ? " disabled" : ""}>+</button>
                </div>
                <div class="slider${showInput ? " more" : ""}${size ? " " + size : ""}">
                    <div class="controller controller-left">
                        <div class="indicator">
                            <span class="current">${left}</span>
                            <span class="arrow"></span>
                        </div>
                    </div>
                    <div class="controller controller-right">
                        <div class="indicator">
                            <span class="current">${right}</span>
                            <span class="arrow"></span>
                        </div>
                    </div>
                    <div class="track">
                        <div class="progress"></div>
                    </div>
                </div>
                <div class="slider-input slider-right${showInput ? "" : " hidden"}${size ? " " + size : ""}">
                    <button class="less"${min >= right || right - step <= left || disabled ? " disabled" : ""}>-</button>
                    <input type="text" title="${right}" value="${right}"${disabled ? " disabled" : ""}>
                    <button class="more"${max <= right || disabled ? " disabled" : ""}>+</button>
                </div>
            `;
            shadow.innerHTML = html;
            self.eventProcessing(); // 调用事件处理
            self.checkInput(); // 校准 slider 数据
        }

        eventProcessing() {
            // 事件处理
            let self = this;
            // 左侧减点击事件
            self.shadowRoot.querySelector(".slider-left .less").addEventListener("click", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (this.hasAttribute("disabled")) { // 禁用
                    return false;
                }
                let tempStep = self.leftActive - 1; // 变化后的激活段数
                if (tempStep < 0) { // 超过了最小值
                    return false;
                }
                self.leftActive -= 1;
                self.currentLeftActive = self.leftActive;
                self.calibrationSlider(); // 校准 slider 的数据
            });
            // 左侧加点击事件
            self.shadowRoot.querySelector(".slider-left .more").addEventListener("click", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (this.hasAttribute("disabled")) { // 禁用
                    return false;
                }
                let tempStep = self.leftActive + 1; // 变化后的激活段数
                if (tempStep >= self.rightActive) { // 超过了右侧区间
                    return false;
                }
                self.leftActive += 1;
                self.currentLeftActive = self.leftActive;
                self.calibrationSlider(); // 校准 slider 的数据
            });
            // 右侧减点击事件
            self.shadowRoot.querySelector(".slider-right .less").addEventListener("click", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (this.hasAttribute("disabled")) { // 禁用
                    return false;
                }
                let tempStep = self.RightActive - 1; // 变化后的激活段数
                if (tempStep <= self.leftActive) { // 超过了最大值
                    return false;
                }
                self.rightActive -= 1;
                self.currentRightActive = self.rightActive;
                self.calibrationSlider(); // 校准 slider 的数据
            });
            // 右侧加点击事件
            self.shadowRoot.querySelector(".slider-right .more").addEventListener("click", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (this.hasAttribute("disabled")) { // 禁用
                    return false;
                }
                let tempStep = self.rightActive + 1; // 变化后的激活段数
                if (tempStep * self.stepValue + self.minValue > self.maxValue) { // 超过了最大值
                    return false;
                }
                self.rightActive += 1;
                self.currentRightActive = self.rightActive;
                self.calibrationSlider(); // 校准 slider 的数据
            });
            // 输入框 keyup 事件
            self.shadowRoot.querySelector(".slider-left input").addEventListener("keyup", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (e.keyCode == 13) { // 回车
                    this.blur();
                }
            });
            self.shadowRoot.querySelector(".slider-right input").addEventListener("keyup", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (e.keyCode == 13) { // 回车
                    this.blur();
                }
            });
            // 输入框 focus 事件
            self.shadowRoot.querySelector(".slider-left input").addEventListener("focus", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.parentElement.classList.add("active"); // 添加输入框的激活状态
            });
            self.shadowRoot.querySelector(".slider-right input").addEventListener("focus", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.parentElement.classList.add("active"); // 添加输入框的激活状态
            });
            // 输入框 blur 事件
            self.shadowRoot.querySelector(".slider-left input").addEventListener("blur", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.parentElement.classList.remove("active"); // 移除输入框的激活状态
                self.checkInput(); // 校验数据
            });
            self.shadowRoot.querySelector(".slider-right input").addEventListener("blur", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.parentElement.classList.remove("active"); // 移除输入框的激活状态
                self.checkInput(); // 校验数据
            });
            // 滑块容器 mouseenter 事件
            self.shadowRoot.querySelector(".slider").addEventListener("mouseenter", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                this.querySelector(".controller-left").classList.add("active");
                this.querySelector(".controller-right").classList.add("active");
                self.calibrationTip(); // 校准 tip 位置
            });
            // 滑块 mousedown 事件
            self.shadowRoot.querySelector(".slider .controller-left").addEventListener("mousedown", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                self.drag = true; // 开始拖拽
                self.startX = e.screenX; // 记录开始拖拽的鼠标位置
                self.ctrl = 0; // 记录点击的控制器
            });
            self.shadowRoot.querySelector(".slider .controller-right").addEventListener("mousedown", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                self.drag = true; // 开始拖拽
                self.startX = e.screenX; // 记录开始拖拽的鼠标位置
                self.ctrl = 1; // 记录点击的控制器
            });
            // 滑块容器 mousemove 事件
            // self.shadowRoot.querySelector(".slider").addEventListener("mousemove", function(e) {
            window.addEventListener("mousemove", function(e) {
                if (self.disabled) { // 组件被禁用
                    return false;
                }
                if (!self.drag) { // 尚未开启拖拽
                    return false;
                }
                let diff = e.screenX - self.startX; // 拖拽距离
                let totalDiff = self.maxValue - self.minValue; // 值域范围
                let totalLen = self.shadowRoot.querySelector(".slider .track").offsetWidth; // slider 总长度
                let stepTotalCount = totalDiff / self.stepValue; // 分段数
                let stepLen = Math.floor(totalLen / stepTotalCount); // 步长对应像素长度
                if (diff % stepLen <= stepLen * 0.2 || diff % stepLen >= stepLen * 0.8) {
                    let stepCount = Math.round(diff / totalLen * stepTotalCount); // 当前变化段数
                    if (self.ctrl == 0) {
                        let realStepCount = self.leftActive + stepCount; // 计算目前激活段数
                        if (realStepCount >= self.currentRightActive) realStepCount = self.currentRightActive - 1; // 设置最大值
                        if (realStepCount < 0) realStepCount = 0; // 设置最小值
                        self.currentLeftActive = realStepCount; // 记录
                        self.calibrationSlider(); // 校准 slider 的数据
                    }
                    if (self.ctrl == 1) {
                        let realStepCount = self.rightActive + stepCount; // 计算目前激活段数
                        if (realStepCount <= self.currentLeftActive) realStepCount = self.currentLeftActive + 1; // 设置最小值
                        if (realStepCount > stepTotalCount) realStepCount = stepTotalCount; // 设置最大值
                        self.currentRightActive = realStepCount; // 记录
                        self.calibrationSlider(); // 校准 slider 的数据
                    }
                }
            });
            // 滑块容器 mouseup 事件
            window.addEventListener("mouseup", function(e) {
                if (!self.drag) { // 尚未开启拖拽
                    return false;
                }
                // 获取当前激活段数
                self.leftActive = self.currentLeftActive || 0;
                self.rightActive = self.currentRightActive || 0;
                self.drag = false; // 拖拽停止
                self.shadowRoot.querySelector(".slider .controller-left").classList.remove("active"); // 隐藏滑块数字
                self.shadowRoot.querySelector(".slider .controller-right").classList.remove("active"); // 隐藏滑块数字
            });
            // 组件 mouseleave 事件
            self.addEventListener("mouseleave", function(e) {
                if (self.drag) { // 开启拖拽
                    return false;
                }
                // self.active = self.currentActive || 0; // 获取当前激活段数
                // self.drag = false; // 拖拽停止
                this.shadowRoot.querySelector(".slider .controller-left").classList.remove("active"); // 隐藏滑块数字
                this.shadowRoot.querySelector(".slider .controller-right").classList.remove("active"); // 隐藏滑块数字
            });
        }

        calibrationTip() {
            // 校准 tip 位置
            let self = this;
            let controllerPosition = self.shadowRoot.querySelector(".slider .controller-left").getBoundingClientRect();
            let tipPosition = self.shadowRoot.querySelector(".slider .controller-left .indicator").getBoundingClientRect();
            let left = controllerPosition.left + controllerPosition.width / 2 - tipPosition.width / 2;
            self.shadowRoot.querySelector(".slider .controller-left .indicator").style.left = left + "px";
            let top = controllerPosition.top - tipPosition.height - 6;
            if (top < 0) {
                top = controllerPosition.top + controllerPosition.height + 6;
                self.shadowRoot.querySelector(".slider .controller-left .indicator").classList.add("reverse");
            } else {
                self.shadowRoot.querySelector(".slider .controller-left .indicator").classList.remove("reverse");
            }
            self.shadowRoot.querySelector(".slider .controller-left .indicator").style.top = top + "px";
            controllerPosition = self.shadowRoot.querySelector(".slider .controller-right").getBoundingClientRect();
            tipPosition = self.shadowRoot.querySelector(".slider .controller-right .indicator").getBoundingClientRect();
            left = controllerPosition.left + controllerPosition.width / 2 - tipPosition.width / 2;
            self.shadowRoot.querySelector(".slider .controller-right .indicator").style.left = left + "px";
            top = controllerPosition.top - tipPosition.height - 6;
            if (top < 0) {
                top = controllerPosition.top + controllerPosition.height + 6;
                self.shadowRoot.querySelector(".slider .controller-right .indicator").classList.add("reverse");
            } else {
                self.shadowRoot.querySelector(".slider .controller-right .indicator").classList.remove("reverse");
            }
            self.shadowRoot.querySelector(".slider .controller-right .indicator").style.top = top + "px";
        }

        checkInput() {
            // 校验输入框的数据
            let self = this;
            let tempLeftValue = new Number(self.shadowRoot.querySelector(".slider-left input").value.replace(/[^0-9\.\+-]/g, "") || 0); // 获取输入框的值
            let tempRightValue = new Number(self.shadowRoot.querySelector(".slider-right input").value.replace(/[^0-9\.\+-]/g, "") || 0); // 获取输入框的值
            // 阈值判定
            if (tempLeftValue < self.minValue) tempLeftValue = self.minValue;
            if (tempLeftValue > self.maxValue) tempLeftValue = self.maxValue;
            if (tempRightValue < self.minValue) tempRightValue = self.minValue;
            if (tempRightValue > self.maxValue) tempRightValue = self.maxValue;
            if (tempLeftValue >= tempRightValue) {
                if (tempLeftValue + self.stepValue <= self.maxValue) {
                    tempRightValue = tempLeftValue + self.stepValue;
                } else {
                    tempLeftValue = tempRightValue - self.stepValue;
                }
            }
            // 阶层校准
            let diff = tempLeftValue - self.minValue;
            let tempStep = Math.round(diff / self.stepValue);
            self.leftActive = tempStep;
            self.currentLeftActive = self.leftActive;
            diff = tempRightValue - self.minValue;
            tempStep = Math.round(diff / self.stepValue);
            self.rightActive = tempStep;
            self.currentRightActive = self.rightActive;
            self.calibrationSlider(); // 矫正数据
        }

        calibrationSlider() {
            // 校准组件数据
            let self = this;
            let totalDiff = self.maxValue - self.minValue; // 值域范围
            let stepTotalCount = totalDiff / self.stepValue; // 分段数
            // 校验左右步阶的合法性
            if (self.currentLeftActive < 0) self.currentLeftActive = 0;
            if (self.currentLeftActive > self.currentRightActive - 1) self.currentLeftActive = self.currentRightActive - 1;
            if (self.currentRightActive < self.currentLeftActive + 1) self.currentRightActive = self.currentLeftActive + 1;
            if (self.currentRightActive > stepTotalCount) self.currentRightActive = stepTotalCount;
            let stepPercent = Math.floor(100 / stepTotalCount); // 步长对应百分比
            let leftPercent = (self.currentLeftActive / stepTotalCount * 100).toFixed(2); // 计算左侧百分比
            let rightPercent = (self.currentRightActive / stepTotalCount * 100).toFixed(2); // 计算右侧百分比
            let activePercent = rightPercent - leftPercent; // 计算激活的百分比
            let realLeftValue = self.minValue + self.stepValue * self.currentLeftActive; // 当前的值
            let realRightValue = self.minValue + self.stepValue * self.currentRightActive; // 当前的值
            if (realLeftValue > self.minValue) { // 更新左侧 - 按钮的状态
                self.shadowRoot.querySelector(".slider-left .less").removeAttribute("disabled");
            } else {
                self.shadowRoot.querySelector(".slider-left .less").setAttribute("disabled", "");
            }
            if (realRightValue - realLeftValue > self.stepValue) { // 更新左侧 + 和 右侧 - 按钮的状态
                self.shadowRoot.querySelector(".slider-left .more").removeAttribute("disabled");
                self.shadowRoot.querySelector(".slider-right .less").removeAttribute("disabled");
            } else {
                self.shadowRoot.querySelector(".slider-left .more").setAttribute("disabled", "");
                self.shadowRoot.querySelector(".slider-right .less").setAttribute("disabled", "");
            }
            if (realRightValue < self.maxValue) { // 更新右侧 + 按钮状态
                self.shadowRoot.querySelector(".slider-right .more").removeAttribute("disabled");
            } else {
                self.shadowRoot.querySelector(".slider-right .more").setAttribute("disabled", "");
            }
            self.shadowRoot.querySelector(".slider .controller-left").style.left = leftPercent + "%";
            self.shadowRoot.querySelector(".slider .controller-right").style.left = rightPercent + "%";
            self.shadowRoot.querySelector(".slider .controller-left .current").innerText = realLeftValue;
            self.shadowRoot.querySelector(".slider .controller-right .current").innerText = realRightValue;
            self.shadowRoot.querySelector(".slider-left input").value = realLeftValue;
            self.shadowRoot.querySelector(".slider-left input").setAttribute("title", realLeftValue);
            self.shadowRoot.querySelector(".slider-right input").value = realRightValue;
            self.shadowRoot.querySelector(".slider-right input").setAttribute("title", realRightValue);
            self.shadowRoot.querySelector(".slider .track .progress").style.left = leftPercent + "%";
            self.shadowRoot.querySelector(".slider .track .progress").style.width = activePercent + "%";
            self.calibrationTip(); // 校准 tip 位置
        }

        get disabled() {
            // 获取禁用状态
            return this.hasAttribute("disabled");
        }

        set disabled(value) {
            if (value) {
                // 禁用
                this.setAttribute("disabled", "");
                this.shadowRoot.querySelector(".slider-input button").setAttribute("disabled", "");
                this.shadowRoot.querySelector(".slider-input input").setAttribute("disabled", "");
            } else {
                // 启用
                this.removeAttribute("disabled");
                this.shadowRoot.querySelector(".slider-input input").removeAttribute("disabled");
                this.calibrationSlider();
            }
        }

        get value() {
            // 获取当前值
            let self = this;
            return [self.minValue + self.leftActive * self.stepValue, self.minValue + self.rightActive * self.stepValue];
        }

        set value(value) {
            // 设置当前右区间值
            if (!Array.isArray(value) || value.length != 2) {
                return false;
            }
            let self = this;
            // 阈值判定
            let left = new Number(value[0] || 0);
            if (left < self.minValue) left = self.minValue;
            if (left > (self.rightActive - 1) * self.stepValue + self.minValue) left = (self.rightActive - 1) * self.stepValue + self.minValue;
            // 阶层校准
            let diff = left - self.minValue;
            let tempStep = Math.round(diff / self.stepValue);
            self.currentLeftActive = tempStep;
            // 阈值判定
            let right = new Number(value[1] || 0);
            if (right > self.maxValue) right = self.maxValue;
            if (right < (self.leftActive + 1) * self.stepValue + self.minValue) right = (self.leftActive + 1) * self.stepValue + self.minValue;
            // 阶层校准
            diff = right - self.minValue;
            tempStep = Math.round(diff / self.stepValue);
            self.currentRightActive = tempStep;
            self.calibrationSlider(); // 矫正数据
            self.leftActive = self.currentLeftActive;
            self.rightActive = self.currentRightActive;
        }

        get min() {
            // 获取最小值
            let self = this;
            return self.minValue;
        }

        set min(value) {
            // 设置最小区间
            let self = this;
            let min = new Number(value) || 0; // 值域最小值
            if (min > self.maxValue - self.stepValue) { // 判断最小值是否合法
                return false;
            }
            self.minValue = min; // 设置最小值
            self.calibrationSlider(); // 矫正数据
        }

        get max() {
            // 获取最大值
            let self = this;
            return self.maxValue;
        }

        set max(value) {
            // 设置最大值
            let self = this;
            let max = new Number(value) || 0; // 值域最大值
            if (max < self.minValue + self.stepValue) { // 判断最大值是否合法
                return false;
            }
            self.maxValue = max; // 设置最大值
            self.calibrationSlider(); // 矫正数据
        }

        get step() {
            // 获取步长
            let self = this;
            return self.stepValue;
        }

        set step(value) {
            // 设置步长
            let self = this;
            let step = new Number(value) || 0; // 步长
            if (step > self.maxValue - self.minValue) { // 判断步长是否合法
                return false;
            }
            if (step == 0) step = 1;
            if ((self.maxValue - self.minValue) % step != 0) self.maxValue = self.minValue + Math.ceil((self.maxValue - self.minValue) / step) * step;
            self.stepValue = step; // 设置步长
            self.calibrationSlider(); // 矫正数据
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
            let html = /*html*/ `
                <style type="text/css">
                    :host(m-tag) {
                        width: -moz-fit-content;
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
                        width: -moz-fit-content;
                        width: fit-content;
                        padding: 0 6px;
                        color: var(--m-tag-color, #636363);
                        font-size: var(--m-tag-font-size, 14px);
                        white-space: nowrap;
                        line-height: 1.5;
                        border-radius: 3px;
                        border: var(--m-tag-color, #636363) 1px solid;
                        background: #fff;
                        transition: all .2s linear;
                    }
                    :host(m-tag:not([disabled])) .tag:hover {
                        color: var(--m-tag-active-color, #0359ff);
                        border: var(--m-tag-active-color, #0359ff) 1px solid;
                    }
                    :host(m-tag:not([disabled])) .tag.active {
                        color: var(--m-tag-active-color, #0359ff);
                        border: var(--m-tag-active-color, #0359ff) 1px solid;
                        background: var(--m-tag-active-bg, rgba(3,99,255,.05));
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
                    message: "this component's child node should be <m-select> or <m-input>"
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
            let html = /*html*/ `
                <style type="text/css">
                    :host(m-form-item) {
                        width: -moz-fit-content;
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

    // m-album-item 定义
    class mAlbumItem extends HTMLElement {
        constructor() {
            super();
            this.initComponent();
        }

        attachedCallback() {
            // 挂载生命周期钩子
            this.initVerification();
        }

        initVerification() {
            // 合法性验证
            if (this.parentNode.nodeName != "M-ALBUM") {
                let param = {
                    name: "m-album-item",
                    message: "m-album-item must be wrapped by <m-album>"
                };
                mError.apply(param, [this]);
            }
        }

        initComponent() {
            // 初始化组件
        }
    }

    // m-album 定义
    class mAlbum extends HTMLElement {
        constructor() {
            super();
            this.initComponent();
        }

        initComponent() {
            // 初始化组件
            let self = this;
            let autoplay = self.getAttribute("autoplay") || "true"; // 是否自定播放
            if (autoplay == "true") {
                autoplay = true;
            } else {
                autoplay = false;
            }
            let interval = self.getAttribute("interval") || 3000; // 自动播放的时间间隔
            let trigger = self.getAttribute("trigger"); // 指示器触发方式
            if (trigger == "hover") {
                trigger = "mouseenter";
            } else {
                trigger = "click";
            }
            let indicatorPosition = self.getAttribute("indicator-position"); // 指示器位置
            if (indicatorPosition == "outside") {
                indicatorPosition = "outside";
            } else {
                indicatorPosition = "inside";
            }
            self.index = 0;
            self.trigger = trigger;
            self.autoplay = autoplay;
            self.interval = interval;
            let shadow = self.shadowRoot || self.attachShadow({ mode: "open" }); // shadowDOM
            shadow.resetStyleInheritance = true; // 重置样式
            let html = /*html*/ `
                <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
                <style type="text/css">
                    :host(m-album) {
                        display: block;
                    }
                    :host(m-album) > div {
                        width: var(--m-album-width, 100%);
                        height: var(--m-album-height, auto);
                        min-height: 160px;
                        overflow: hidden;
                        position: relative;
                    }
                    :host(m-album) > div.outside {
                        padding-bottom: 27px;
                    }
                    :host(m-album) .content {
                        width: 100%;
                        min-height: 100%;
                        background: #fafafa;
                        position: relative;
                    }
                    :host(m-album) .content ::slotted(m-album-item) {
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 100%;
                        z-index: 0;
                    }
                    :host(m-album) .content ::slotted(m-album-item.active-left) {
                        -webkit-animation: slideInRight .5s ease; /*Safari and Chrome*/
                        animation: slideInRight .5s ease-out;
                        left: 0;
                        z-index: 99;
                    }
                    :host(m-album) .content ::slotted(m-album-item.active-right) {
                        z-index: 99;
                        -webkit-animation: slideInLeft .5s ease; /*Safari and Chrome*/
                        animation: slideInLeft .5s ease-out;
                        left: 0;
                        z-index: 99;
                    }
                    :host(m-album) .content ::slotted(m-album-item.inactive-left) {
                        -webkit-animation: slideOutLeft .5s ease; /*Safari and Chrome*/
                        animation: slideOutLeft .5s ease-out;
                        z-index: 59;
                    }
                    :host(m-album) .content ::slotted(m-album-item.inactive-right) {
                        z-index: 99;
                        -webkit-animation: slideOutRight .5s ease; /*Safari and Chrome*/
                        animation: slideOutRight .5s ease-out;
                        z-index: 59;
                    }
                    :host(m-album) .content .arrows {
                        visibility: hidden;
                    }
                    :host(m-album) > div:hover .content .arrows {
                        visibility: visible;
                    }
                    :host(m-album) .content .arrows > div {
                        width: 36px;
                        height: 36px;
                        color: #fff;
                        font-size: 12px;
                        cursor: pointer;
                        border-radius: 18px;
                        background: rgba(31,45,61,.11);
                        transition: left .3s linear, right .3s linear;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        top: 50%;
                        z-index: 999;
                        margin-top: -18px;
                    }
                    :host(m-album) .content .arrows > div:hover {
                        background: rgba(31,45,61,.24);
                    }
                    :host(m-album) .content .arrows .arrow-left {
                        left: 0;
                    }
                    :host(m-album) > div:hover .content .arrows .arrow-left {
                        left: 16px;
                    }
                    :host(m-album) .content .arrows .arrow-right {
                        right: 0;
                    }
                    :host(m-album) > div:hover .content .arrows .arrow-right {
                        right: 16px;
                    }
                    :host(m-album) .indicators {
                        width: 100%;
                        padding: 12px 0;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        z-index: 999;
                    }
                    :host(m-album) .indicators ul {
                        width: -moz-fit-content;
                        width: fit-content;
                        list-style: none;
                        display: flex;
                        justify-content: center;
                        margin: 0 auto;
                    }
                    :host(m-album) .indicators ul li {
                        display: block;
                    }
                    :host(m-album) .indicators ul li:not(:last-of-type) {
                        margin-right: 8px;
                    }
                    :host(m-album) .indicators ul li button {
                        width: 30px;
                        height: 3px;
                        padding: 0;
                        cursor: pointer;
                        outline: none;
                        border: none;
                        background: #c0c4cc;
                        opacity: .24;
                        display: block;
                    }
                    :host(m-album) .indicators ul li button.active {
                        opacity: 1;
                    }
                </style>
                <div class="album${indicatorPosition == "outside" ? " outside" : ""}">
                    <div class="content">
                        <slot></slot>
                        <div class="arrows">
                            <div class="arrow-left"><i class="m-iconfont ming-icon-previous"></i></div>
                            <div class="arrow-right"><i class="m-iconfont ming-icon-next"></i></div>
                        </div>
                    </div>
                    <div class="indicators"><ul></ul></div>
                </div>
            `;
            self.shadowRoot.innerHTML = html;
            self.calcComponent(); // 计算组件动态值
            self.eventProcessing(); // 调用事件处理
            self.autoPlayProcessing(); // 自动播放处理
        }

        calcComponent() {
            // 计算组件动态值
            let self = this;
            let items = Array.from(this.children); // 所有子元素
            let itemLen = 0; // item 数
            self.shadowRoot.querySelector(".indicators ul").innerHTML = ""; // 清空所有指示器
            items.forEach(function(item) {
                if (item.nodeName != "M-ALBUM-ITEM") { // 自动移除非 m-album-item 元素
                    item.remove();
                    return false;
                }
                let liEle = document.createElement("li");
                let buttonEle = document.createElement("button");
                buttonEle.setAttribute("index", itemLen);
                liEle.append(buttonEle);
                if (itemLen == 0) {
                    item.classList.add("active", "active-left");
                    buttonEle.classList.add("active");
                }
                self.shadowRoot.querySelector(".indicators ul").append(liEle); // 加入指示器
                itemLen++;
            });
            self.count = itemLen;
        }

        eventProcessing() {
            // 事件处理
            let self = this;
            self.shadowRoot.querySelector(".album").addEventListener("mouseenter", function(e) { // 鼠标移入
                self.pause = true; // 将暂停标记符设置为 true
            });
            self.shadowRoot.querySelector(".album").addEventListener("mouseleave", function(e) { // 鼠标移出
                self.pause = false; // 将暂停标记符设置为 false
            });
            self.shadowRoot.querySelector(".arrow-left").addEventListener("click", function(e) { // 前一页
                let index = (self.index - 1 + self.count) % self.count; // 新的被激活的item index
                let item = self.querySelectorAll("m-album-item")[index]; // 获取 item
                if (item.classList.contains("active")) { // 已经显示
                    return false;
                }
                let activeItems = Array.from(self.querySelectorAll("m-album-item.active")); // 获取所有激活的卡片
                activeItems.forEach(function(activeItem) {
                    activeItem.classList.remove("active", "active-left", "active-right"); // 清空所有的激活状态
                    activeItem.classList.add("inactive-left");
                });
                if (item) { // 存在该元素
                    item.classList.remove("inactive-left", "inactive-right"); // 移除非激活状态
                    item.classList.add("active", "active-left"); // 添加激活状态
                    let activeButtons = Array.from(self.shadowRoot.querySelectorAll(".indicators button.active")); // 获取所有激活的按钮
                    activeButtons.forEach(function(activeButton) {
                        activeButton.classList.remove("active"); // 清除激活状态
                    });
                    self.shadowRoot.querySelector(`.indicators li:nth-child(${index + 1}) button`).classList.add("active"); // 添加此按钮的激活状态
                    self.index = index; // 设置新的 index
                }
            });
            self.shadowRoot.querySelector(".arrow-right").addEventListener("click", function(e) { // 后一页
                let index = (self.index + 1) % self.count; // 新的被激活的item index
                let item = self.querySelectorAll("m-album-item")[index]; // 获取 item
                if (item.classList.contains("active")) { // 已经显示
                    return false;
                }
                let activeItems = Array.from(self.querySelectorAll("m-album-item.active")); // 获取所有激活的卡片
                activeItems.forEach(function(activeItem) {
                    activeItem.classList.remove("active", "active-left", "active-right"); // 清空所有的激活状态
                    activeItem.classList.add("inactive-right");
                });
                if (item) { // 存在该元素
                    item.classList.remove("inactive-left", "inactive-right"); // 移除非激活状态
                    item.classList.add("active", "active-right"); // 添加激活状态
                    let activeButtons = Array.from(self.shadowRoot.querySelectorAll(".indicators button.active")); // 获取所有激活的按钮
                    activeButtons.forEach(function(activeButton) {
                        activeButton.classList.remove("active"); // 清除激活状态
                    });
                    self.shadowRoot.querySelector(`.indicators li:nth-child(${index + 1}) button`).classList.add("active"); // 添加此按钮的激活状态
                    self.index = index; // 设置新的 index
                }
            });
            self.shadowRoot.querySelector(".indicators").addEventListener(self.trigger, function(e) { // 指示器监听
                let button = e.target; // 获取点击对象
                if (button.nodeName != "BUTTON") { // 点击元素并非 button
                    return false;
                }
                if (button.classList.contains("active")) { // 按钮已经激活
                    return false;
                }
                let activeButtons = Array.from(self.shadowRoot.querySelectorAll(".indicators button.active")); // 获取所有激活的按钮
                activeButtons.forEach(function(activeButton) {
                    activeButton.classList.remove("active"); // 清除激活状态
                });
                button.classList.add("active"); // 添加此按钮的激活状态
                let index = button.getAttribute("index"); // 获取新的 index
                let item = self.querySelectorAll("m-album-item")[index]; // 获取 item
                let activeItems = Array.from(self.querySelectorAll("m-album-item.active")); // 获取所有激活的卡片
                if (item) { // 存在该元素
                    if (index < self.index) {
                        activeItems.forEach(function(activeItem) {
                            activeItem.classList.remove("active", "active-left", "active-right"); // 清空所有的激活状态
                            activeItem.classList.add("inactive-left");
                        });
                        item.classList.remove("inactive-left", "inactive-right"); // 移除非激活状态
                        item.classList.add("active", "active-left"); // 添加激活状态
                    } else {
                        activeItems.forEach(function(activeItem) {
                            activeItem.classList.remove("active", "active-left", "active-right"); // 清空所有的激活状态
                            activeItem.classList.add("inactive-right");
                        });
                        item.classList.remove("inactive-left", "inactive-right"); // 移除非激活状态
                        item.classList.add("active", "active-right"); // 添加激活状态
                    }
                    self.index = index; // 设置新的 index
                }
            });
        }

        autoPlayProcessing() {
            // 自动播放处理
            let self = this;
            if (self.autoplay) { // 设定了自动播放
                setInterval(function() {
                    if (self.pause) { // 鼠标在组件内，暂停自动播放
                        return false;
                    }
                    let index = (self.index + 1) % self.count; // 新的被激活的item index
                    let item = self.querySelectorAll("m-album-item")[index]; // 获取 item
                    if (item.classList.contains("active")) { // 已经显示
                        return false;
                    }
                    let activeItems = Array.from(self.querySelectorAll("m-album-item.active")); // 获取所有激活的卡片
                    activeItems.forEach(function(activeItem) {
                        activeItem.classList.remove("active", "active-left", "active-right"); // 清空所有的激活状态
                        activeItem.classList.add("inactive-right");
                    });
                    if (item) { // 存在该元素
                        item.classList.remove("inactive-left", "inactive-right"); // 移除非激活状态
                        item.classList.add("active", "active-right"); // 添加激活状态
                        let activeButtons = Array.from(self.shadowRoot.querySelectorAll(".indicators button.active")); // 获取所有激活的按钮
                        activeButtons.forEach(function(activeButton) {
                            activeButton.classList.remove("active"); // 清除激活状态
                        });
                        self.shadowRoot.querySelector(`.indicators li:nth-child(${index + 1}) button`).classList.add("active"); // 添加此按钮的激活状态
                        self.index = index; // 设置新的 index
                    }
                }, self.interval);
            }
        }
    }

    // m-operation 定义
    class mOperation extends HTMLElement {
        constructor() {
            super();
            this.initComponent();
        }

        attachedCallback() {
            // 挂载生命周期钩子
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
                    self.parentElement.shrinkList(); // 收缩菜单
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
            this.style.cssText = "width: intrinsic; width: -moz-max-content; width: -webkit-max-content; padding: 0 !important; display: table-cell;";
            let operationWidth = this.scrollWidth;
            this.style.cssText = "";
            this.parentElement.calcLabelSize(operationWidth); // 计算label的尺寸
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
            let html = /*html*/ `
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
                        cursor: pointer;
                        border-radius: 16px;
                        background: var(--m-operation-list-bg, #0359ff);
                        box-sizing: border-box;
                        display: inline-flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    :host(m-operation-list) .m-operation-tip.disabled,
                    :host(m-operation-list:hover) .m-operation-tip.disabled {
                        color: var(--m-operation-list-disable-color, #8f8f8f);
                        background: var(--m-operation-list-disable-bg, #e9e9e9);
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
                        width: -moz-fit-content;
                        width: fit-content;
                        max-width: 180px;
                        height: fit-content;
                        padding: 0;
                        border-radius: 4px;
                        position: fixed;
                        z-index: 0;
                    }
                    :host(m-operation-list) .m-operation-list.active {
                        border: var(--m-select-border, 1px solid #e4e7ed);
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                    }
                    :host(m-operation-list) .m-operation-list .operation-list {
                        width: 100%;
                        height: 0;
                        padding: 0;
                        list-style: none;
                        overflow: hidden;
                        background: #fff;
                        box-sizing: border-box;
                        transition: height .3s ease, padding .2s linear;
                        position: relative;
                    }
                    :host(m-operation-list) .m-operation-list.active .operation-list {
                        padding: 8px 0;
                    }
                    :host(m-operation-list) .m-operation-list .operation-list > div:first-child {
                        width: 100%;
                        height: fit-content;
                        position: relative;
                    }
                    :host(m-operation-list) .m-operation-list ::slotted(m-operation) {
                        width: 100%;
                        padding: 0 12px;
                        color: var(--m-operation-color, #333);
                        white-space: nowrap;
                        line-height: 30px;
                        text-overflow: ellipsis;
                        cursor: pointer;
                        list-style: none;
                        overflow: hidden;
                        box-sizing: border-box;
                        display: block;
                    }
                    :host(m-operation-list) .m-operation-list ::slotted(m-operation:hover) {
                        color: var(--m-operation-active-color, #0359ff);
                        background: var(--m-operation-active-bg, #f3f3f3);
                    }
                    :host(m-operation-list) .m-operation-list ::slotted(m-operation[disabled]) {
                        color: var(--m-operation-disable-color, #8f8f8f);
                        cursor: not-allowed;
                        background: none;
                    }
                    :host(m-operation-list) .m-operation-list .arrow,
                    :host(m-operation-list) .m-operation-list .arrow::after {
                        width: 0;
                        height: 0;
                        border-width: 6px;
                        border-color: transparent;
                        border-style: solid;
                        border-top-width: 0;
                        border-bottom-color: #ebeef5;
                        filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
                        display: none;
                        position: absolute;
                        top: -7px;
                        left: 40px;
                    }
                    :host(m-operation-list) .m-operation-list.right .arrow {
                        left: auto;
                        right: 40px;
                    }
                    :host(m-operation-list) .m-operation-list.active .arrow,
                    :host(m-operation-list) .m-operation-list.active .arrow::after {
                        display: block;
                    }
                    :host(m-operation-list) .m-operation-list .arrow::after {
                        content: " ";
                        border-top-width: 0;
                        border-bottom-color: #fff;
                        margin-left: -6px;
                        top: 1px;
                        left: 0;
                    }
                    :host(m-operation-list) .m-operation-list.rotate .arrow,
                    :host(m-operation-list) .m-operation-list.rotate .arrow::after {
                        border-top-width: 6px;
                        border-bottom-width: 0;
                        border-top-color: #ebeef5;
                        border-bottom-color: transparent;
                        top: auto;
                        bottom: -6px;
                    }
                    :host(m-operation-list) .m-operation-list.rotate .arrow::after {
                        border-top-width: 6px;
                        border-bottom-width: 6px;
                        border-top-color: #fff;
                        border-bottom-color: transparent;
                    }
                </style>
                <div class="m-operation-tip${disabled ? " disabled" : ""}">
                    <i class="m-iconfont ming-icon-operation"></i>
                    <span>相关操作</span>
                    <i class="arrow m-iconfont ming-icon-arrow-down"></i>
                </div>
                <div class="m-operation-list">
                    <div class="operation-list">
                        <div><slot></slot></div>
                    </div>
                    <div class="arrow"></div>
                </div>
            `;
            shadow.innerHTML = html;
            this.calcLabelSize(); // 计算宽度和位置
            self.eventHandler(); // 事件处理
        }

        eventHandler() {
            // 事件处理
            let self = this;
            // 点击事件处理
            self.shadowRoot.querySelector(".m-operation-tip").addEventListener("click", function(e) {
                self.clickHandler();
            });
            // 页面点击监听
            document.addEventListener("click", function(e) {
                let obj = e.target;
                if (self.active && obj.nodeName != "M-OPERATION-LIST" && obj.nodeName != "M-OPERATION") {
                    self.shrinkList();
                }
            });
            // 页面滚轮监听（webkit）
            document.addEventListener("mousewheel", function(e) {
                let obj = e.target;
                if (self.active && obj.nodeName != "M-OPERATION-LIST" && obj.nodeName != "M-OPERATION") {
                    self.shrinkList();
                }
            });
            // 页面滚轮监听（firefox）
            document.addEventListener("DOMMouseScroll", function(e) {
                let obj = e.target;
                if (self.active && obj.nodeName != "M-OPERATION-LIST" && obj.nodeName != "M-OPERATION") {
                    self.shrinkList();
                }
            });
            // 移除组建内冒泡和默认事件（webkit）
            this.addEventListener("mousewheel", function(e) {
                e.stopPropagation();
                e.cancelBubble = true;
                e.preventDefault();
                e.returnValue = false;
            });
            // 移除组建内冒泡和默认事件（firefox）
            this.addEventListener("DOMMouseScroll", function(e) {
                e.stopPropagation();
                e.cancelBubble = true;
                e.preventDefault();
                e.returnValue = false;
            });
        }

        clickHandler() {
            // 点击事件处理
            let self = this;
            if (self.active) { // 已经激活
                self.shrinkList();
            } else { // 还没有激活
                self.expandList();
            }
        }

        expandList() {
            // 展开列表
            if (this.disabled) {
                return false;
            }
            this.shadowRoot
                .querySelector(".m-operation-tip .arrow")
                .classList.add("arrow-rotate");
            let optionLength = Array.from(this.querySelectorAll("m-operation"))
                .length;
            this.shadowRoot
                .querySelector(".m-operation-list")
                .classList.add("active");
            this.shadowRoot.querySelector(".operation-list").style.height =
                optionLength * 30 + 8 * 2 + "px";
            this.calcWidthAndPosition();
            this.shadowRoot.querySelector(".m-operation-list").style.zIndex = 999;
            this.active = true;
        }

        shrinkList() {
            // 收缩列表
            let self = this;
            self.shadowRoot.querySelector(".m-operation-tip .arrow").classList.remove("arrow-rotate");
            self.shadowRoot.querySelector(".operation-list").style.height = 0;
            self.shadowRoot.querySelector(".m-operation-list").classList.remove("active");
            self.active = false;
            self.listStyleResetDelay = setTimeout(function() {
                self.resetListStyle();
            }, 300);
        }

        resetListStyle() {
            this.shadowRoot.querySelector(".m-operation-list").style.zIndex = 0;
        }

        calcLabelSize(operationWidth) {
            // 计算列表宽度
            let self = this;
            if (self.operationWidth == undefined) {
                self.operationWidth = 0;
            }
            self.operationWidth =
                self.operationWidth > operationWidth ?
                self.operationWidth :
                operationWidth;
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
                top: componentPosition.top + componentPosition.height + 10,
                left: componentPosition.left,
                bottom: window.innerHeight - componentPosition.top + 10,
                right: window.innerWidth -
                    componentPosition.width -
                    componentPosition.left
            };
            let optionListHeight = parseInt(
                this.shadowRoot
                .querySelector(".operation-list")
                .style.height.replace("px")
            );
            if (position.top + optionListHeight + 20 >= window.innerHeight) {
                this.shadowRoot.querySelector(".m-operation-list").style.top = null;
                this.shadowRoot.querySelector(".m-operation-list").style.bottom =
                    position.bottom + "px";
                this.shadowRoot.querySelector(".m-operation-list").classList.add("rotate");
            } else {
                this.shadowRoot.querySelector(".m-operation-list").style.bottom = null;
                this.shadowRoot.querySelector(".m-operation-list").style.top =
                    position.top + "px";
                this.shadowRoot.querySelector(".m-operation-list").classList.remove("rotate");
            }
            if (position.left + self.operationWidth >= window.innerWidth) {
                this.shadowRoot.querySelector(".m-operation-list").style.left = null;
                this.shadowRoot.querySelector(".m-operation-list").style.right =
                    position.right + "px";
                this.shadowRoot.querySelector(".m-operation-list").classList.add("right");
            } else {
                this.shadowRoot.querySelector(".m-operation-list").style.right = null;
                this.shadowRoot.querySelector(".m-operation-list").style.left =
                    position.left + "px";
                this.shadowRoot.querySelector(".m-operation-list").classList.remove("right");
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
            let html = /*html*/ `
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
                        width: -moz-fit-content;
                        width: fit-content;
                        height: 32px;
                        color: var(--m-function-color, #fff);
                        font-size: 14px;
                        border-radius: 16px;
                        background: var(--m-function-bg, #0359ff);
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
                        background: var(--m-function-disable-bg, #e9e9e9);
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
                        width: -moz-fit-content;
                        width: fit-content;
                        white-space: nowrap;
                    }
                </style>
                <div class="m-function${disabled ? " disabled" : ""}">&nbsp;
                    <div class="m-function-content">
                    <i class="m-iconfont ${
                        iconClass ? iconClass : (icon ? "" : "ming-icon-plus")
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
            let html = /*html*/ `
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
                        width: -moz-fit-content;
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
                        background: var(--m-icon-function-active-bg, #e9e9e9);
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
                        width: -moz-fit-content;
                        width: fit-content;
                        font-size: 12px;
                        white-space: nowrap;
                        visibility: hidden;
                        position: absolute;
                    }
                    :host(m-icon-function) .m-function .m-function-tip {
                        width: -moz-fit-content;
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
                        width: -moz-fit-content;
                        width: fit-content;
                        padding: 8px;
                        color: var(--m-icon-function-tip-color, #fff);
                        font-size: 12px;
                        line-height: 1;
                        border-radius: 3px;
                        background: var(--m-icon-function-tip-bg, #000);
                        box-shadow: rgba(0,0,0,0.25) 4px 4px 10px;
                        display: block;
                    }
                </style>
                <div class="m-function${disabled ? " disabled" : ""}">
                <div class="m-function-content">
                    <i class="m-iconfont ${
                    iconClass ? iconClass : (icon ? "" : "ming-icon-plus")
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
            let top = componentPosition.y || componentPosition.top;
            if (top && top > 80) {
                this.shadowRoot
                    .querySelector(".m-function")
                    .classList.remove("m-function-down");
                this.shadowRoot
                    .querySelector(".m-function")
                    .classList.add("m-function-up");
                this.shadowRoot.querySelector(
                    ".m-function .m-function-tip-up"
                ).style.top = (componentPosition.y || componentPosition.top) - 40 + "px";
                this.shadowRoot.querySelector(
                        ".m-function .m-function-tip-up"
                    ).style.left =
                    (componentPosition.x || componentPosition.left) - tipWidth / 2 + this.offsetWidth / 2 + "px";
            } else {
                this.shadowRoot
                    .querySelector(".m-function")
                    .classList.remove("m-function-up");
                this.shadowRoot
                    .querySelector(".m-function")
                    .classList.add("m-function-down");
                this.shadowRoot.querySelector(
                    ".m-function .m-function-tip-down"
                ).style.top = (componentPosition.y || componentPosition.top) + this.offsetHeight + 8 + "px";
                this.shadowRoot.querySelector(
                        ".m-function .m-function-tip-down"
                    ).style.left =
                    (componentPosition.x || componentPosition.left) - tipWidth / 2 + this.offsetWidth / 2 + "px";
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
                                this.parentNode.parentNode, []
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
                type: new RegExp(/^(\&\#)(.)*(;)$/).test(this.getAttribute("icon")) ?
                    "unicode" : "class"
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
            let html = /*html*/ `
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
                        background: var(--m-menu-group-active-bg, #f3f3f3);
                        box-shadow: var(--m-menu-group-active-shadow, none);
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
                                    this.parentNode, []
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
            let shadowContent = /*html*/ `
                <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
                <style type="text/css">
                    :host(m-table) {
                        width: -moz-fit-content;
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
                        width: -moz-fit-content;
                        width: fit-content;
                        min-width: 100%;
                        min-height: 100px;
                        overflow: auto;
                    }
                    :host(m-table) .table-body .table-header {
                        width: -moz-fit-content;
                        width: fit-content;
                        min-width: 100%;
                        background: var(--m-table-header-bg, #dfe8fb);
                        border-bottom: 1px solid #ebeff2;
                    }
                    :host(m-table) .table-header .main-table-header {
                        width: -moz-fit-content;
                        width: fit-content;
                    }
                    :host(m-table) .table-body .table-main {
                        width: -moz-fit-content;
                        width: fit-content;
                        min-width: 100%;
                        overflow: auto;
                        background: #fff;
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
                        background: #f5f5f5;
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
                        width: -moz-fit-content;
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
                        width: -moz-fit-content;
                        width: fit-content;
                        background: var(--m-table-header-bg, #dfe8fb);
                        border-bottom: 1px solid #ebeff2;
                    }
                    :host(m-table) .fixed-body .fixed-table {
                        width: -moz-fit-content;
                        width: fit-content;
                        overflow: auto;
                        background: #fff;
                    }
                    :host(m-table) .table-footer {
                        width: 100%;
                        height: 62px;
                        padding: 15px 30px;
                        box-sizing: border-box;
                        background: #fff;
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
            let shadowContent = /*html*/ `
                <link rel="stylesheet" type="text/css" href="${url}iconfont/iconfont.css">
                <style type="text/css">
                    :host(m-simple-table) {
                        width: -moz-fit-content;
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
                        background: #eef2f6;
                    }
                    :host(m-simple-table) .table-body .table-main {
                        width: 100%;
                        overflow-y: auto;
                        background: #fff;
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
                        background: #f5f5f5;
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

    customElements.define("m-select", mSelect); // m-select注册
    customElements.define("m-option", mOption); // m-option注册
    customElements.define("m-input", mInput); // m-input注册
    customElements.define("m-file", mFile); // m-file注册
    customElements.define("m-date", mDate); // m-date注册
    customElements.define("m-color", mColor); // m-color注册
    customElements.define("m-switch", mSwitch); // m-switch注册
    customElements.define("m-slider", mSlider); // m-slider注册
    customElements.define("m-range-slider", mRangeSlider); // m-range-slider注册
    customElements.define("m-tag", mTag); // m-tag注册
    customElements.define("m-form-item", mFormItem); // m-form-item注册
    customElements.define("m-album-item", mAlbumItem); // m-album-item注册
    customElements.define("m-album", mAlbum); // m-album注册
    customElements.define("m-operation-list", mOperationList); // m-option注册
    customElements.define("m-operation", mOperation); // m-operation注册
    customElements.define("m-function", mFunction); // m-function注册
    customElements.define("m-icon-function", mIconFunction); // m-function注册
    customElements.define("m-menu-item", mMenuItem); // m-menu-item 注册
    customElements.define("m-menu-group", mMenuGroup); // m-menu-group 注册
    customElements.define("m-menu", mMenu); // m-menu 注册
    customElements.define("m-inner-cell", mInnerCell); // m-table 注册
    customElements.define("m-table", mTable); // m-table 注册
    customElements.define("m-simple-table", mSimpleTable); // m-simple-table 注册
}();