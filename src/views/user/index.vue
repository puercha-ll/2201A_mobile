<template>
    <div>
        <el-card>
            <el-tabs v-model="activeName">
                <el-tab-pane label="推荐" name="1"></el-tab-pane>
                <el-tab-pane label="最新" name="2"></el-tab-pane>
            </el-tabs>
            <ul v-if="activeName == '1'" v-infinite-scroll="load" class="box" style="overflow: auto">
                <li class="item" v-for="item in list" :key="item.id">
                    <div class="content" @click="toDetail(item.id)">
                        <div class="text">
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.desc }}</p>
                            <div>
                                <span>{{ item.name }}</span>
                                <span>
                                    <el-icon>
                                        <View />
                                    </el-icon>
                                    {{ item.viewnum }}
                                </span>
                                <span>
                                    <el-icon>
                                        <Star />
                                    </el-icon>{{ item.likesnum }}
                                </span>
                            </div>
                        </div>
                        <img :src="item.image" alt="">
                    </div>
                </li>
            </ul>
            <div v-else>
                我是第二个页面
            </div>
        </el-card>


    </div>
</template>
<script>
import request from '@/utils/request';
export default {
    data() {
        return {
            activeName: '1',
            list: [],
            pagination: 0,
            total: null
        }
    },
    created() {
        // this.getList()
    },
    methods: {
        load() {
            if (this.list.length !== this.total) {
                this.pagination++
                this.getList()
            }
        },
        getList() {
            console.log(this.total, 'this.total', this.list.length)
            request.get('/tabList', {
                params: {
                    pageNum: 10, pagination: this.pagination
                }
            }).then(res => {
                this.list = [...this.list, ...res.data.data]
                this.total = res.data.total
            })
        },
        toDetail(id) {
            this.$router.push(`/user/detail/${id}`)
        }
    }
}
</script>
<style lang="scss" scoped>
.box {
    height: 588px;

    .item {
        border-bottom: 1px solid rgba(228, 230, 235, 0.5);
        padding: 6px 0;

        .content {
            display: flex;
            justify-content: space-between;

            .text {
                flex: 1;
                width: 80%;

                h4 {
                    line-height: 28px;
                }

                p {
                    color: #8a919f;
                    font-size: 14px;
                    line-height: 26px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                span {
                    color: #8a919f;
                    font-size: 14px;
                    margin-right: 30px;
                }
            }

            img {
                width: 100px;
                height: 80px;
                padding-left: 50px;
                padding-right: 10px;
                flex-shrink: 0;
            }
        }

    }

}
</style>