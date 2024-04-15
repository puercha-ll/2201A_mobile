<template>
    <div>
        <el-card class="form-card">
            <el-form :inline="true" :model="searchObj" class="demo-form-inline" label-width="auto">
                <el-form-item label="角色名称">
                    <el-input v-model="searchObj.name" placeholder="角色名称" clearable />
                </el-form-item>
                <el-form-item label="角色标识">
                    <el-input v-model="searchObj.identity" placeholder="角色标识" clearable />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchObj.status" placeholder="状态" clearable>
                        <el-option label="打开" :value="true" />
                        <el-option label="关闭" :value="false" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onQuery">查询</el-button>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <div class="title">
                <h4>角色列表</h4>
                <div>
                    <el-button type="primary" @click="onAdd">新增角色</el-button>
                    <Connection style="width: 1em; height: 1em; margin-right: 8px;margin-left:20px;" />
                    <Connection style="width: 1em; height: 1em; margin-right: 8px" />
                    <el-icon>
                        <Compass />
                    </el-icon>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%" show-overflow-tooltip>
                <el-table-column prop="id" label="角色编号" width="180" />
                <el-table-column prop="name" label="角色名称" width="90" />
                <el-table-column prop="identity" label="角色标识" width="120" />
                <el-table-column prop="status" label="状态" width="110">
                    <template #default="{ row }">
                        <el-switch v-model="row.status" />
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" />
                <el-table-column prop="createtime" label="创建时间" width="170" />
                <el-table-column fixed="right" label="操作" width="110">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="onEdit(row)">修改</el-button>
                        <el-popconfirm title="你确认删除吗?" @confirm="onConfirm(row)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="->,total,prev, pager, next" :total="total"
                @current-change="handleCurrentChange"
                style="margin-top: 10px; margin-right: 2px; margin-bottom: -10px" />
        </el-card>
        <el-dialog v-model="showDialog" :title="flag ? '新增角色' : '修改角色'" width="500">
            <el-form :model="formValue" label-width="80px" :rules="rules">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="formValue.name" />
                </el-form-item>
                <el-form-item label="角色标识" prop="identity">
                    <el-input v-model="formValue.identity" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formValue.remark" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showDialog = false">取消</el-button>
                    <el-button type="primary" @click="onSure">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            searchObj: {
                name: '',
                identity: '',
                status: '',
                pageNum: 10, //每页的个数
                pagination: 1 // 第几页
            },
            tableData: [],
            total: 0,
            showDialog: false,
            formValue: {
                name: '',
                identity: '',
                remark: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                identity: [
                    { required: true, message: '请输入角色标识', trigger: 'blur' },
                    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' },
                ],
            },
            flag: true,
            editId: ''
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            request.get('/list', { params: this.searchObj }).then(res => {
                this.tableData = res.data.data
                this.total = res.data.total
            })
        },
        handleCurrentChange(val) {
            this.searchObj.pagination = val
            this.getList()
        },
        onQuery() {
            this.getList()
        },
        onReset() {
            this.searchObj = {
                name: "",
                identity: "",
                status: "",
                pagination: 1,
                pageNum: 10
            }
            this.getList()
        },
        onAdd() {
            this.showDialog = true
            this.flag = true
            this.formValue = {
                name: "",
                identity: "",
                remark: ""
            }
        },
        onEdit(row) {
            console.log(row, 'row')
            this.editId = row.id
            this.flag = false  // 判断是新增还是修改 flag:true表示新增 false表示修改
            this.showDialog = true // 展示弹框
            // 回显数据
            this.formValue.name = row.name
            this.formValue.identity = row.identity
            this.formValue.remark = row.remark

        },
        onSure() {
            this.flag ? request.post('/add', this.formValue).then(res => {
                if (res.data.code == 200) {
                    ElMessage({
                        message: '新增成功',
                        type: 'success',
                    })
                    this.showDialog = false
                    this.getList()
                }
            }) : request.post('/edit', { ...this.formValue, id: this.editId }).then(res => {
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
                this.showDialog = false
                this.getList()
            })

        },
        onConfirm(row) {
            request.post('/delete', { id: row.id }).then(res => {
                if (res.data.code == 200) {
                    this.$message.success("删除成功")
                    this.getList()
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.form-card {
    margin-bottom: 10px;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
}

.demo-form-inline .el-input {
    --el-input-width: 200px;
}

.demo-form-inline .el-select {
    --el-select-width: 200px;
}
</style>