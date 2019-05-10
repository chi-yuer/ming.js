# 表格文档

## 使用

1.  自定义表格配置

    ```javascript
    let config = {
        pageSize: 20,
        data: async function () {
            let tabledata = {
                status: 0,
                data: [],
                total: 0,
            };
            await fly.get('/data/table_example.json')
                .then(function (response) {
                    if (response.status == 200) {
                        tabledata.status = response.status;
                        if (response.data.status == 200) {
                            tabledata.data = response.data.data;
                            tabledata.total = response.data.total;
                        }
                    }
                })
            	.catch(function (error) {});
            return tabledata;
        },
        columns: [
            [
                {
                    title: '序号',
                    rowspan: 2,
                    formatter: function (column, row, index) {
                        return index + 1;
                    }
                },
                {title: '第一组', colspan: 9},
                {title: '第二组', colspan: 3},
                {
                    title: '操作',
                    fixed: true,
                    rowspan: 2,
                    formatter: function (column, row, index) {
                        return `<m-operation-list>
                            <m-operation>操作项 A</m-operation>
                            <m-operation>操作项 B</m-operation>
                            <m-operation>操作项 C</m-operation>
                            </m-operation-list>`;
                    },
                },
            ],
            [
                {title: '数据 1', field: 'col1'},
                {title: '数据 2', field: 'col2'},
                {title: '数据 3', field: 'col3'},
                {title: '数据 4', field: 'col4'},
                {title: '数据 5', field: 'col5'},
                {title: '数据 6', field: 'col6'},
                {title: '数据 7', field: 'col7'},
                {title: '数据 8', field: 'col8'},
                {title: '数据 9', field: 'col9'},
                {title: '数据 10', field: 'col10'},
                {title: '数据 11', field: 'col11'},
                {title: '数据 12', field: 'col12'},
            ]
        ]
    };
    ```

2.  注册表格配置

    ```javascript
    document.querySelector('m-table').register(config);
    ```

    

## 配置项（config）

```
{
	pageSize: 分页大小，为整形数字
	pageNumber: 分页页码，为整形数字
	data: 表格的数据构造工厂，返回一个表格数据对象
	columns: 表格标题和数据映射关系，为一个数组，若元素为数组，则表头一行的配置为一个数组，若元素为对象，则表头仅一行
	[
		{ 表格列的配置项
			title: 该列对应的表头，为字符串
			field: 该列数据对应的字段（key），为字符串
			width: 指定本列的宽度，如: 20px
			colspan: 指定本列的水平合并的单元格数量，整形数字，默认为 1
			rowspan: 指定本列的垂直合并的单元格数量，整形数字，默认为 1
			align: 指定本列的水平对齐方式，可选值 left/right/center
			valign: 指定本列的垂直对齐方式，可选值 top/bottom/middle
			formatter: 指定本列的数据处理方式，默认直接显示（若为空显示 -），值类型为一个 function，默认可传递 3 个参数，分别为本列的值，本行的数据对象和本行的 index（从 0 开始计数）
		}
	]
	success: 加载成功时的回调，值为一个 function, 第一个参数为 m-table 对象，第二个参数为表格数据集
	error: 加载失败时的回调，值为一个 function, 第一个参数为 m-table 对象，第二个参数为表格数据集
}
```



## 数据格式

### 表格数据的结构

表格渲染数据需要使用指定的数据格式

```
{
	status: 状态值，整形数字， 200 为成功，其它都是失败
	total： 记录总数，整形数字
	data: 对象构成的数组，表格的数据
}
```



## 操作

### getOption

**参数**

-   **option:** 配置项名称，string 类型

**枚举**

-   **getOption(“pageSize”):** 获取分页尺寸
-   **getOption(“pageNumber”):** 获取当前页码
-   **getOption(“columns”):** 获取表头的配置项
-   **getOption(“error”):** 获取加载数据错误的回调
-   **getOption(“success”):** 获取加载数据成功的回调函数



### setOption

**参数**

-   **option:** 配置项或操作的名称，string 类型
-   **value（可选）:** 配置项的改变值

**枚举**

-   **setOption(“pageSize”, 20):** 设置分页大小为20条记录并重新渲染表格
-   **setOption(“pageNumber”, 2):** 设置页码为第二页并重新渲染表格
-   **setOption(“error”, function (obj, data) {}):** 设置加载失败的回调函数
-   **setOption(“success”, function (obj, data) {}):** 设置加载成功的回调函数
-   **setOption(“refresh”):** 重新获取数据并渲染表格
-   **setOption(“reload”):** 将页码重置为 1 并重新渲染表格
-   **setOption(“previous”):** 上一页
-   **setOption(“next”):** 下一页
-   **setOption(“first”):** 首页
-   **setOption(“last”):** 尾页