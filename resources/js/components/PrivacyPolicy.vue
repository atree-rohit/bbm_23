<style scoped>
.header {
    align-items: center;
}

.header .h1 {
    flex-grow: 2;
}

.main-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

.section {
    border: 1px solid #ccc;
    border-radius: 1.5rem;
    min-height: 50vh;
    margin: 2.5rem 0;
    padding: 2.5rem 0;
    width: 100%;
}

.paragraphs-container {
    padding: 0 2rem;
}

p.section-text {
    text-indent: 3.5rem;
}
p.section-text::first-letter {
    font-size: 150%;
    line-height: 1rem;
    color: var(--primary);
}

@media screen and (max-width: 768px) {
    .paragraphs-container {
        padding: 0 1rem;
    }
}
</style>

<template>
    <div class="header container px-2">
        <div class="h1">Privacy Policy for Butterfly Counts</div>
        <p class="p-3">
            This Privacy Policy describes how Butterfly Counts ("we", "us", or
            "our") collects, uses, and shares information when you use our
            Butterfly Counts mobile application (the "App") and the services
            provided through the App.
        </p>
    </div>

    <div class="container px-5" v-for="p in policy" :key="p.title">
        <div class="h3" v-text="p.title" />
        <dl>
            <template v-for="q in p.points" :key="q.title">
                <dt v-text="q.title" />
                <dd v-text="q.description" />
            </template>
        </dl>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
    name: "PrivacyPolicy",
    data() {
        return {
            policy: [
                {
                    title: "Information We Collect",
                    points: [
                        {
                            title: "Google Account Information",
                            description:
                                "When you sign in to Butterfly Counts using your Google account, we may collect your Google account information such as your name and email address.",
                        },
                        {
                            title: "Checklist Information",
                            description:
                                "When you use Butterfly Counts to record checklists of butterflies, we collect the information you submit, including the species of butterflies observed and any notes or comments you provide.",
                        },
                        {
                            title: "Location Information",
                            description:
                                "With your consent, we may collect and process information about your device's precise location, which is used to enhance the accuracy of your butterfly observations.",
                        },
                    ],
                },
                {
                    title: "How We Use Your Information",
                    points: [
                        {
                            title: "Checklist Submission",
                            description:
                                "We use the information you submit through Butterfly Counts to record and manage your butterfly observations. Your observations contribute to biodiversity research and conservation efforts.",
                        },
                        {
                            title: "Analytics",
                            description:
                                "If you choose to make your checklists open access, we will use this data to generate analytics on Butterfly Counts and other related platforms, including bigbutterflymonth.in. These analytics may be shared with third parties for research, conservation, and educational purposes, always with appropriate credits and acknowledgments.",
                        },
                        {
                            title: "Data Portals",
                            description:
                                "Open access checklists will be periodically published to data portals like the Global Biodiversity Information Facility (GBIF) with appropriate credits and acknowledgments. By submitting open access checklists, you consent to the publication of your data on such portals.",
                        },
                    ],
                },
                {
                    title: "Your Choices",
                    points: [
                        {
                            title: "Checklist Privacy",
                            description:
                                "You have the option to choose whether your checklists are open access or not. Open access checklists may be shared publicly and used for analytics and research purposes. You retain full control over your data, and you can update your privacy settings at any time.",
                        },
                        {
                            title: "Location Data",
                            description:
                                "You can control whether we collect and process your device's location data through your device settings or through the App's settings. We use location data solely to enhance the accuracy of your butterfly observations and never share it without your explicit consent.",
                        },
                    ],
                },
                {
                    title: "Data Security",
                    points: [
                        {
                            title: "User Rights and Data Security",
                            description:
                                "We prioritize the security and privacy of your data. You retain all rights over your data, and we take appropriate measures to safeguard it against unauthorized access, alteration, disclosure, or destruction. We comply with applicable data protection laws and regulations, and we are committed to transparency and accountability in our data practices. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.",
                        },
                    ],
                },
                {
                    title: "Changes to This Privacy Policy",
                    points: [
                        {
                            title: "Notification of Changes",
                            description:
                                "We may update our Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be effective immediately upon posting the updated Privacy Policy on this page. We encourage you to review this Privacy Policy periodically for any updates or changes.",
                        },
                    ],
                },
                {
                    title: "Contact Us",
                    points: [
                        {
                            title: "Questions or Concerns",
                            description:
                                "If you have any questions or concerns about our Privacy Policy, our data practices, or your rights regarding your personal information, please contact us at [bigbutterflymonth@gmail.com]. We are committed to addressing your inquiries promptly and transparently.",
                        },
                    ],
                },
            ],
        };
    },
});
</script>
