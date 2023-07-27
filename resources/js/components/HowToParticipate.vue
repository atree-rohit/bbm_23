<style scoped>
    .section-btn-container{
        /* border: 1px solid green; */
        display: flex;
        justify-content: center;
        transition: all 1s ease;
    }
    
    .section-btn{
        padding: 0.5rem 1.5rem;
        margin: 0 1rem;
        text-transform: uppercase;
        font-size: 1.25rem;
        transition: all .25s ease;
    }

    .section-card{
        /* border: 1px solid red; */
        margin: 1rem 2rem;
    }

    .section-card .section-card-body{
        margin:1rem;
        display: flex;
        flex-direction: column;
    }

    .card-links{
        margin-top: 0.5rem;
    }

    .link-pills{
        margin: 0.5rem;
    }

    .link-pills > span{
        font-size: .85rem;
        font-weight: 500;;
        /* background: green; */
    }

    .card-caption p.card-text{
        text-indent: 3.5rem;
    }
    .card-caption p.card-text::first-letter {
        font-size: 150%;
        line-height: 1rem;
        color: var(--primary);
    }

    @media screen and (min-width: 728px) {
        .section-card .section-card-body{
            /* flex-direction: row; */
            display: grid;
            grid-template-columns:  1fr auto;
            grid-template-areas:
                "title links"
                "caption links"
                "suggestions links"
                "additional additional"
        }
        .card-title{
            grid-area: title;
        }
        .card-caption{
            grid-area: caption;
        }
        .card-suggestions{
            grid-area: suggestions;
        }
        .card-links{
            grid-area: links;
            margin-top: 0;
            margin-left: 0.25rem;
        }

        .card-links .link-pills{
            display: flex;
            flex-direction: column;

        }
        .container-fluid{
            grid-area: additional;
        }
        
    }
</style>
<template>
    <div class="header ">
        <div class="fs-1 ps-3 pt-2">How to Participate</div>
        <div class="section-btn-container">
          <button
                class="btn rounded-pill section-btn"
                v-for="(section, section_id) in sections"
                :key="section_id"
                :class="section_id == show_section ? 'btn-success' : 'btn-outline-success'"
                @click="show_section = section_id"
                v-text="section.section"
            />
        </div>
    </div>
    <div
        class="card section-card"
        v-for="(subsection, subsection_id) in current_section.subsections"
        :key="subsection_id"
    >
        <div class="section-card-body">
            <div class="card-title fs-1 m-0">{{ subsection.name }}</div>
            <div class="card-caption p-2">
                <p
                    class="card-text fs-5"
                    v-for="(line, k) in subsection.caption"
                    :key="k"
                    v-text="line"
                />
            </div>
            <div class="card-suggestions border border-primary rounded bg-light">
                <div class="bg-primary text-light p-1 h4">What you can do</div>
                <ol>
                    <li
                        class="card-text px-3 my-1"
                        v-for="(text, k) in subsection.suggestions"
                        :key="k"
                        v-text="text"
                    />
                </ol>
            </div>
            <div class="card-links border border-success rounded bg-light" v-if="subsection.links">
                <div class="bg-success text-light p-1 h4 m-0">Links and Resources</div>
                <div class="link-pills">
                    <span
                        class="rounded-pill btn btn-outline-primary m-1"
                        v-for="(link, k) in subsection.links"
                        :key="k"
                        v-text="link.name"
                        @click="gotoLink(link)"
                    />
                </div>
            </div>
            <district-coordinators v-if="show_section == 1 && subsection_id == 1"/>
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
                            "caption": [
                                "Join us in this exciting citizen science event and become a butterfly enthusiast! No special expertise needed – just your enthusiasm and keen eyes! Contribute to our collective understanding of India's diverse butterfly population.",
                                "Your small contributions matter! Each butterfly sighting you record helps piece together the larger puzzle of butterfly distribution in India. Start documenting today and monitor changes over time.",
                                "Capture the fluttering wings in photographs and add species to your checklist. Together, we can understand and conserve these delicate wonders of nature.",
                                "Ready to embark on a butterfly discovery adventure? Grab your camera, head outdoors, and start recording your sightings today. Make a significant impact on butterfly conservation in India!"
                            ],
                            "suggestions": [
                                "Explore butterfly-rich areas for diverse species.",
                                "Be patient and spot hidden butterflies in nature.",
                                "Capture butterfly sightings with your camera or smartphone.",
                                "Create a butterfly-friendly environment in your own backyard by planting native flowers and providing water sources, which can attract butterflies to your home.",
                                "Keep a field guide or a butterfly identification app handy to help you identify the species you come across during your outings.",
                                "Participate in guided butterfly walks or workshops organized by local naturalists or conservation groups to enhance your knowledge and appreciation of butterflies.",
                                "Contribute your observations to citizen science portals, such as iNaturalist, India Biodiversity Portal or iFound Butterflies",
                                "Share your butterfly sightings and experiences on social media using event-specific hashtags to raise awareness and encourage others to participate in the citizen science initiative.",
                            ],
                            "links": [
                                {
                                    "name": "Butterfly Photography Tips",
                                    "link": "https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/top-10-tips-for-taking-great-photos-of-butterflies.html"
                                },{
                                    "name": "iNaturalist",
                                    "link": "https://www.inaturalist.org/",
                                    "next_link": "https://www.inaturalist.org/projects/big-butterfly-month-india-2023"
                                },{
                                    "name": "India Biodiversity Portal",
                                    "link": "https://www.indiabiodiversity.org/",
                                },{
                                    "name": "iFound Butterflies",
                                    "link": "https://www.ifoundbutterflies.org/",
                                },

                            ]
                        },{
                            "name": "Make Butterfly Checklists",
                            "caption": [
                                "Embrace the challenge of crafting detailed checklists - a rewarding endeavor for the committed enthusiast! By adhering to the protocol and honing your butterfly identification skills, your data becomes exceptionally valuable. Your dedication empowers us to uncover patterns and trends crucial for conservation efforts.",
                                "Checklist data is a treasure trove of knowledge! With species, abundance, and behavioral details meticulously recorded, we unlock a deeper understanding of butterfly populations. This information helps us analyze distribution, seasonal patterns, and more, driving informed conservation strategies.",
                                "Your contributions directly impact the preservation of these delicate wonders. By providing essential data on species abundance and diversity, you play a vital role in safeguarding butterfly habitats. Together, we can work towards maintaining healthy ecosystems for butterflies to thrive.We need your passion and expertise! Create butterfly checklists, and embark on a journey of discovery that fuels conservation. Your efforts pave the way for a brighter future for butterflies in India. Join the movement and make a lasting impact on their well-being!"
                            ],
                            "suggestions": [
                                "Record the date, location, and weather conditions before starting your observation.",
                                "Allocate 30 minutes for each checklist recording.",
                                "Walk slowly and record butterflies on both sides of the path.",
                                "Note down the species you encounter and the number of individuals you observe.",
                                "Observe and record the activity of each butterfly, such as mating, feeding, basking, displaying, or bud-puddling.",
                                "At the end of the 30 minutes, ensure you have comprehensive data recorded for your checklist.",
                                "If using the website's app, submit your checklist through the provided submission feature.",
                                "If creating an excel file, use the provided format and manually enter the recorded data.",
                                "Once your checklist is ready, submit it via the website for valuable data collection.",
                                "Your contribution plays a vital role in butterfly conservation efforts. Thank you for being a part of this exciting citizen science event!"
                            ],
                            "links" :[
                                {
                                    "name": "Manual for Butterfly Monitoring",
                                    "link": "https://www.researchgate.net/publication/236633174_Manual_for_Butterfly_Monitoring"
                                }
                            ]
                        }
                    ]
                },
                {
                    "section": "Organize",
                    "subsections": [
                        {
                            "name": "Organize an event",
                            "caption": [
                                "Organizing events creates opportunities for people to connect with nature, fosters a sense of community, and raises awareness about the conservation of butterflies and their habitats.",
                            ],
                            "suggestions": [
                                "Host awareness programs to educate the public about the importance of butterflies in the ecosystem.",
                                "Arrange butterfly walks or field trips to explore local butterfly habitats and observe different species.",
                                "Conduct online talks or webinars featuring butterfly experts to engage a wider audience.",
                                "Organize contests for children, such as butterfly drawing competitions or butterfly-themed quizzes.",
                                "Use social media and online platforms to reach out to more people and spread awareness about butterflies."
                            ],
                            links: [
                                {
                                    name: "Butterfly Walks",
                                    link: "https://www.researchgate.net/publication/236633174_Manual_for_Butterfly_Monitoring"
                                }
                            ]
                        },
                        {
                            "name": "Become a district coordinator",
                            "caption": [
                                "Being a district coordinator allows you to play a pivotal role in expanding butterfly monitoring efforts, bridging the gap between participants and experts, and encouraging a collaborative approach to butterfly conservation."
                            ],
                            "suggestions": [
                                "Stimulate participation from your district by reaching out to schools, colleges, and local nature clubs.",
                                "Identify gap areas and regions with limited butterfly observation, and focus efforts on promoting participation in those areas.",
                                "Coordinate between participants and organizers to provide support, such as helping participants contact experts for guidance or identification assistance.",
                                "Assist participants with technical aspects of contributing data and observations to citizen science portals."
                            ],
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
                            "caption": "Assisting in identifying butterflies on citizen science portals contributes to the accuracy of data, aiding in more reliable research and conservation efforts."
                        },
                        {
                            "name": "Identify potential participants",
                            "suggestions": [
                                "Reach out to schools, colleges, and nature clubs to identify potential participants who can join BBM.",
                                "Identify individuals with a keen interest in nature, wildlife, or conservation and encourage them to take part.",
                                "Engage with social media influencers or environmental activists to spread the word about BBM and attract more participants."
                            ],
                            "caption": "Identifying potential participants and advocates helps in expanding the BBM community, amplifying its impact, and fostering a wider interest in butterfly conservation."
                        }
                    ]
                }
            ],
            show_section: 1,
        }
    },
    computed: {
        current_section(){
            if(this.show_section == -1)
            return null
            return this.sections[this.show_section]
        },
    },
    methods:{
        gotoLink(link){
            window.open(link.link, '_blank')
        }
    }
})
</script>