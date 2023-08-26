<style scoped>
    .footer-container{
        padding: 0.25rem 0.5rem ;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2.5rem;
    }
    .footer-container>div a{
        display: flex;
        gap: 1.5rem;
        background: hsl(0, 0%, 100%, .85);
        padding: 0.25rem 0.75rem ;
        border-radius: 1rem;
    }
    .footer-container i{
        font-size: 2rem;
    }

    .footer-container a div{
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
    }

    @media screen and (max-width: 768px) {
        .footer-container{
            flex-direction: column;
            gap: 0.25rem;
        }
        .footer-container>div a{
            gap: 0.5rem;
            padding: -5rem;
        }
    }
</style>

<template>
    <div class="footer-container bg-info">
        <div>
            <a href="mailto://bigbutterflymonth@gmail.com">
                <i class="bi bi-envelope text-primary"></i>
                <div>bigbutterflymonth@gmail.com</div>
            </a>
        </div>
        <div>
            <a href="tel:9971293331">
                <i class="bi bi-whatsapp text-success"></i>
                <div>9971293331</div>
            </a>
        </div>
    </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
export default {
    name: "Footer"
}
</script>