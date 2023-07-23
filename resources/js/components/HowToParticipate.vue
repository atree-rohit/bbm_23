<style>
    .header{
        align-items: center;
    }

    .header .h1{
        flex-grow:2;
    }

    .main-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .section{
        border: 1px solid #ccc;
        /* border-radius: 1.5rem; */
        min-height: 50vh;
        /* padding: 2.5rem 0; */
        width: 100%;
    }
</style>
<template>
    <div class="header rowpx-2">
        <div class="h1">How to Participate</div>
    </div>
    <div class="main-container m-4">
        <div
            class="section"
            v-for="(section, section_id) in sections"
            :key="section_id"
        >
            <div class="h1 text-center bg-dark text-light py-2 m-0">{{section.section}}</div>
            <div
                class="sub-section card bg-secondary p-2"
                v-for="(subsection, subsection_id) in section.subsections"
                :key="subsection_id"
            >
                <div class="card-bodypx-2 py-0">
                    <h3 class="card-title">{{ subsection.name }}</h3>
                    <div class="row">
                        <div class="col px-0 mx-4 border border-primary rounded m-1 bg-light">
                            <h4 class="bg-primary text-light p-1">What to do</h4>
                            <p
                                class="card-text px-3 my-1"
                                v-for="(text, k) in subsection.suggestions"
                                :key="k"
                                v-text="text"
                            />
                        </div>
                        <div class="col px-0 mx-4 border border-success rounded m-1 bg-light ">
                            <h4 class="bg-success text-light p-1">How it Helps</h4>
                            <p class="card-text px-3 my-1" v-text="subsection.advantage" />
                        </div>    
                    </div>
                    <district-coordinators v-if="section_id == 1 && subsection_id == 1"/>
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
                                "name": "Photograph butterflies",
                                "suggestions": [
                                    "Carry a camera or smartphone during outings and capture butterfly sightings.",
                                    "Create a photographic record of butterflies, helping in species identification and documentation.",
                                    "Share your butterfly photographs with others, fostering a sense of community and appreciation for these insects."
                                ],
                                "advantage": "Photographing butterflies allows for detailed documentation, making it easier to study species variations and distribution over time."
                            },{
                            "name": "Contribute on citizen science portals",
                                "suggestions": [
                                    "Register on designated citizen science platforms and submit butterfly observations.",
                                    "Your data contributes to larger scientific databases used for research and conservation efforts.",
                                    "Contribute to a better understanding of butterfly populations and their ecological roles."
                                ],
                                "advantage": "By participating in citizen science, you become part of a collective effort to monitor and protect butterfly species, contributing to conservation initiatives."
                            },{
                                "name": "Share a checklist",
                                "suggestions": [
                                    "Record the butterfly species you spot and share the checklist on the BBM website or other platforms.",
                                    "Encourage others to explore butterfly-watching, promoting awareness about these delicate creatures.",
                                    "Your checklist aids in creating comprehensive records of butterfly diversity in different regions."
                                ],
                                "advantage": "Sharing checklists encourages others to engage in butterfly observation and helps researchers and enthusiasts track species presence and abundance."
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
                ]
        }
    }    
})
</script>