<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <img src="../../public/images/Senza titolo-1.png" alt="D&D Logo" class="logo">
                    <p class="footer-text">© 2024 Bollcraft. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'AppHeader',
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped>
.footer {
    background-color: #1d1d1d;
    color: #ffffff;
    padding: 20px 0;
    margin-top: 50px;
    
}

.logo {
    width: 200px;
    margin-bottom: 10px;
}

.footer-text {
    font-size: 14px;
}
</style>
  