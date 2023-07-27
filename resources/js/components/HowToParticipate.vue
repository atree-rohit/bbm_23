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
                                "Big Butterfly Month is the perfect time for butterfly enthusiasts to come together and rejoice in the magic of butterflies. Through invigorating butterfly walks, engaging talks by experts, captivating contests for children, and more, our shared love for these gentle creatures unites us in a mission to protect and cherish their beauty.",
                                "Promoting Big Butterfly Month brings numerous advantages, fostering awareness about butterfly conservation on a grand scale. By hosting events, we empower individuals to become citizen scientists, contributing valuable data to understand butterfly populations better. Let's inspire communities to embrace sustainable practices, creating butterfly-friendly environments that support these winged wonders throughout the year.",
                                "Join the spirited journey of Big Butterfly Month as we foster friendly competition between different states and even districts within states. By encouraging butterfly enthusiasts to record sightings and host events, we can celebrate the diversity of butterflies in each region, boosting local pride while enriching our collective understanding of India's vibrant butterfly ecosystem.",
                                "In advance, we extend our heartfelt gratitude for your support in spreading the word about Big Butterfly Month. Together, let's make this celebration a resounding success, touching hearts and inspiring actions that will protect and conserve butterflies for generations to come."
                            ],
                            "suggestions": [
                                "Host butterfly walks, camps, and counts to document diverse species.",
                                "Collaborate with schools and colleges for butterfly awareness programs.",
                                "Organize art, photography, essay, and quiz contests celebrating butterflies.",
                                "Promote Big Butterfly Month on social media and in the press.",
                                "Partner with local nature clubs and wildlife organizations for events.",
                                "Offer workshops to improve butterfly identification and gardening skills.",
                                "Encourage citizen scientists to create personalized butterfly checklists."
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
                            "name": "Identify butterflies on citizen science portals",
                            "caption": [
                                "The beauty of citizen science portals lies in their ability to unite experts and enthusiasts in a common pursuit: identifying butterflies. Experts, armed with their specialized knowledge, play a crucial role in validating and verifying the observations submitted by contributors. This collaborative process ensures the accuracy and reliability of the data, which becomes increasingly valuable for research and conservation efforts. As more identification interactions occur, contributors have the unique opportunity to learn about the species they encounter. This exercise not only enhances their understanding of butterflies but also encourages them to deepen their involvement in citizen science initiatives. The interplay between experts, enthusiasts, and contributors enriches the data and propels the advancement of butterfly research nationwide.",
                                "The interactive identification process on citizen science portals empowers butterfly observation contributors in multiple ways. As they witness their sightings being identified and validated by experts, they gain confidence in their abilities and feel a stronger connection to the broader community of butterfly enthusiasts. The platform serves as a valuable learning tool, enabling contributors to enhance their butterfly identification skills through feedback and insights shared by experts. This collaborative and educational experience encourages observation contributors to engage more actively with butterfly conservation initiatives and fosters a thriving community of passionate butterfly enthusiasts and experts united in safeguarding their future."
                            ],
                            "suggestions": [
                                "Explore citizen science portals and actively participate in butterfly identification activities.",
                                "Witness your butterfly sightings being identified and validated by experts, building confidence and a sense of community.",
                                "Even if you're unable to identify the species, help tag experts who can assist in the identification process. Your contribution aids in connecting observations with knowledgeable identifiers.",
                                "If you can only identify butterflies to a certain level, such as family or genus, don't hesitate to contribute. Your partial identification still adds valuable data to the research. Additionally, consider providing constructive feedback to contributors with suggestions on how to improve their photographs and observations, promoting better data quality and enhancing the overall citizen science experience.",
                                "Take advantage of the learning opportunities provided by the platform to enhance your butterfly identification skills.",
                                "Be part of a thriving community of butterfly enthusiasts and experts, united in their passion for butterflies and dedicated to their conservation."
                            ],
                            links: [
                                {
                                    "name": "iNaturalist",
                                    "link": "https://www.inaturalist.org/",
                                    "next_link": "https://www.inaturalist.org/projects/big-butterfly-month-india-2023"
                                },{
                                    "name": "India Biodiversity Portal",
                                    "link": "https://www.indiabiodiversity.org/",
                                }
                            ]
                        },
                        {
                            "name": "Identify potential participants and partners",
                            "caption": [
                                "In the spirit of fostering a strong community, we seek to identify key participants and partners who will play pivotal roles in making Big Butterfly Month a resounding success. From passionate butterfly enthusiasts and nature lovers to students and families, each contributor's engagement is crucial in shaping our collective understanding of India's butterfly population. Alongside participants, potential partners such as educational institutions, nature clubs, wildlife organizations, and local communities hold immense potential for collaborating on awareness programs, workshops, and events dedicated to butterfly conservation and citizen science. By identifying these essential participants and allies, we pave the way for a united force, working harmoniously to protect and cherish these mesmerizing winged wonders.",
                                "Our mission to drive active participation in Big Butterfly Month calls for a concerted effort to connect with individuals and entities who share our vision for a brighter future for butterflies. Through concerted outreach, we aim to engage diverse audiences, inspiring them to embark on butterfly walks, submit observations, and contribute invaluable data to further our conservation goals. Utilizing the power of social media, online forums, and community events, we will spread awareness far and wide, igniting enthusiasm and encouraging active involvement in this important citizen science initiative. Additionally, we identify potential supporters, including environmental influencers, conservationists, and wildlife experts, whose backing will amplify the impact of Big Butterfly Month, inspiring others to join us in safeguarding these delicate wonders and preserving their habitats for generations to come."
                            ],
                            "suggestions": [
                                "Reach out to butterfly enthusiasts, nature lovers, students, and families as potential participants for Big Butterfly Month. Encourage them to engage in butterfly walks, submit observations, and contribute to butterfly conservation.",
                                "Identify educational institutions, nature clubs, wildlife organizations, and local communities as potential partners. Collaborate with them to organize awareness programs, workshops, and events that promote butterfly conservation and citizen science.",
                                "Use social media, online forums, and community events to reach out to potential participants and partners. Leverage digital platforms and local networks to spread awareness and foster active participation in Big Butterfly Month.",
                                "Explore partnerships with environmental influencers, conservationists, and wildlife experts to champion the cause of butterfly conservation. Their support can amplify the impact of Big Butterfly Month and inspire others to join the movement for protecting these delicate wonders."
                            ]
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
    methods:{
        gotoLink(link){
            window.open(link.link, '_blank')
        }
    }
})
</script>