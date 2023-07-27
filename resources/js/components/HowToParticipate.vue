<style scoped>
    .section-btn-container{
        /* width: 50%; */
        margin: auto;
        /* background: red; */
        transition: all 1s ease;
    }
    .section-btn-container:hover{
        background: hsla(200, 55%, 60%, 0.25);
        
    }
    .section-btn{
        padding: 0.5rem 1.5rem;
        margin: 0 1rem;
        text-transform: uppercase;
        font-size: 1.25rem;
        transition: all 0.5s ease;
    }

    .main-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .section{
        /* border: 1px solid #ccc; */
        /* border-radius: 1.5rem; */
        /* min-height: 50vh; */
        /* padding: 2.5rem 0; */
        width: 100%;
    }
</style>
<template>
    <div class="header ">
        <div class="fs-1 ps-3 pt-2">How to Participate</div>
        <div class="section-btn-container d-flex justify-content-center p-2">
          <button
                class="btn rounded-pill section-btn"
                v-for="(section, section_id) in sections"
                :key="section_id"
                :class="section_id == show_section ? 'btn-success' : 'btn-outline-success bg-light text-success'"
                @click="show_section = (show_section == section_id) ? '-1': section_id"
                v-text="section.section"
            />
        </div>
    </div>
    <div class="main-container m-4">
        <div class="section">
            <div
                class="sub-section card"
                v-for="(subsection, subsection_id) in current_section.subsections"
                :key="subsection_id"
            >
                <div class="card-body">
                    <h3 class="card-title h1 ms-0">{{ subsection.name }}</h3>
                    <h6 class="card-subtitle">{{ subsection.advantage }}</h6>
                        <div class="border border-primary rounded bg-light">
                            <h4 class="bg-primary text-light p-1">What to do</h4>
                            <p
                                class="card-text px-3 my-1"
                                v-for="(text, k) in subsection.suggestions"
                                :key="k"
                                v-text="text"
                            />
                        </div>
                    <district-coordinators v-if="show_section == 1 && subsection_id == 1"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import DistrictCoordinators from './DistrictCoordinators.vue'
export default defineComponent({
    name: 'HowToParticipate',
    components: {
        DistrictCoordinators
    },
    data(){
        return {
            sections: [
                {
                    "section": "Observe",
                    "subsections": [
                        {
                            "name": "Observe and Record",
                            "advantage": "Recording butterflies allows for detailed documentation, making it easier to study species variations and distribution over time.",
                            "suggestions": [
                                "Carry a camera or smartphone during outings and capture butterfly sightings.",
                                "Create a photographic record of butterflies, helping in species identification and documentation.",
                            ]
                        },{
                        "name": "Contribute on citizen science portals",
                            "advantage": "By participating in citizen science, you become part of a collective effort to monitor and protect butterfly species, contributing to conservation initiatives.",
                            "suggestions": [
                                "Register on designated citizen science platforms and submit butterfly observations.",
                                "Your data contributes to larger scientific databases used for research and conservation efforts.",
                                "Contribute to a better understanding of butterfly populations and their ecological roles."
                            ]
                        },{
                            "name": "Share a checklist",
                            "advantage": "Sharing checklists encourages others to engage in butterfly observation and helps researchers and enthusiasts track species presence and abundance.",
                            "suggestions": [
                                "Record the butterfly species you spot and share the checklist on the BBM website or other platforms.",
                                "Encourage others to explore butterfly-watching, promoting awareness about these delicate creatures.",
                                "Your checklist aids in creating comprehensive records of butterfly diversity in different regions."
                            ]
                        }
                    ]
                },
                {
                    "section": "Organize",
                    "subsections": [
                        {
                            "name": "Organize an event",
                            "suggestions": [
                                "Host awareness programs to educate the public about the importance of butterflies in the ecosystem.",
                                "Arrange butterfly walks or field trips to explore local butterfly habitats and observe different species.",
                                "Conduct online talks or webinars featuring butterfly experts to engage a wider audience.",
                                "Organize contests for children, such as butterfly drawing competitions or butterfly-themed quizzes.",
                                "Use social media and online platforms to reach out to more people and spread awareness about butterflies."
                            ],
                            "advantage": "Organizing events creates opportunities for people to connect with nature, fosters a sense of community, and raises awareness about the conservation of butterflies and their habitats."
                        },
                        {
                            "name": "Become a district coordinator",
                            "suggestions": [
                                "Stimulate participation from your district by reaching out to schools, colleges, and local nature clubs.",
                                "Identify gap areas and regions with limited butterfly observation, and focus efforts on promoting participation in those areas.",
                                "Coordinate between participants and organizers to provide support, such as helping participants contact experts for guidance or identification assistance.",
                                "Assist participants with technical aspects of contributing data and observations to citizen science portals."
                            ],
                            "advantage": "Being a district coordinator allows you to play a pivotal role in expanding butterfly monitoring efforts, bridging the gap between participants and experts, and encouraging a collaborative approach to butterfly conservation."
                        }
                    ]
                },
                {
                    "section": "Identify",
                    "subsections": [
                        {
                            "name": "Help identify butterflies on citizen science portals",
                            "suggestions": [
                                "Register on citizen science platforms and contribute to the identification of butterfly observations.",
                                "Utilize field guides and online resources to enhance your butterfly identification skills.",
                                "Collaborate with experts and fellow enthusiasts on the portals to verify identifications."
                            ],
                            "advantage": "Assisting in identifying butterflies on citizen science portals contributes to the accuracy of data, aiding in more reliable research and conservation efforts."
                        },
                        {
                            "name": "Identify potential participants",
                            "suggestions": [
                                "Reach out to schools, colleges, and nature clubs to identify potential participants who can join BBM.",
                                "Identify individuals with a keen interest in nature, wildlife, or conservation and encourage them to take part.",
                                "Engage with social media influencers or environmental activists to spread the word about BBM and attract more participants."
                            ],
                            "advantage": "Identifying potential participants and advocates helps in expanding the BBM community, amplifying its impact, and fostering a wider interest in butterfly conservation."
                        }
                    ]
                }
            ],
            show_section: 0,
        }
    },
    computed: {
        current_section(){
            if(this.show_section == -1)
            return null
            return this.sections[this.show_section]
        },
    },
})
</script>