<template>
  <div class="box_pagination">
        <ul class="pagination">
            <li><a href="#" class="prev" @click.prevent="prevPage"></a></li>
            <li v-for="(item, idx) in pagination"
                :key="idx">
                <a
                    href="#"
                    :class="active === item ? 'active' : ''"
                    @click.prevent="openPage(item)"
                >
                    {{ item }}
                </a>
            </li>
            <li>
            <a href="#" class="next" @click.prevent="nextPage"></a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['content'],
    data() {
        return {
        }
    },
    mounted() {

    },
    computed: {
        pagination() {
            let activePage = 1;
            if(this.content.prev) {
                activePage = this.content.prev + 1
            } else if(this.content.next) {
                activePage = this.content.next - 1
            } else {
                activePage = 1
            }

            const totalItems = this.content.count;
            const itemsPerPage = this.content.elementPage;

            const totalPages = Math.ceil(totalItems / itemsPerPage);

            let endPage = totalPages - 1;
            const pagination = []

            if(endPage < 8) {
                for(let i = 1; i < 8; i++) {
                    pagination.push(i);
                }
                return pagination;
            }

            if (activePage >= 5 && activePage <= endPage - 5) {
               pagination.push(1, '...', activePage - 2, activePage - 1, activePage, activePage + 1, activePage + 2, '...', totalPages);
            } else if (activePage > endPage - 5) {
                pagination.push(1, '...',);
                for(let i = 6; i >= 0; i--) {
                    pagination.push(totalPages - i);
                }
            } else {
                for(let i = 1; i <= 5; i++) {
                    pagination.push(i);
                }
                pagination.push('...', totalPages);
            }

            return pagination;
        },
        active() {
            if(this.content.prev)
                return this.content.prev + 1
            else if(this.content.next) {
                return this.content.next - 1
            } 
            return 1
        }
    },
    methods: {
        openPage (item) {
            if(this.active !== item && item !== '...') {
                this.$emit('openPage', item)
            }
            
        },
        prevPage () {
            let activePag = this.active - 1
            if(this.content.prev)
                this.$emit('openPage', activePag)
        },
        nextPage () {
            let activePag = this.active + 1
            if(this.content.next)
                this.$emit('openPage', activePag)
        }
    }
};
</script>
<style scoped src="@/assets/css/screen.css">
</style>
