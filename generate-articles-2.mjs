import fs from 'fs';

const a4 = {
  topic: "AI-Powered Cyber Fraud Network Busted in Surat",
  article: {
    title: "Surat Police arrest 18-year-old for ₹64 crore AI cyber fraud?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, Surat Cyber Crime cell arrested an 18-year-old developer who used AI to create fake banking and government apps, defrauding victims of over ₹64 crore.",
    verdict: "true",
    bodyMarkdown: "## The Arrest and Mastermind\nIn a major breakthrough against organized cybercrime, the Surat City Cyber Crime Cell arrested an 18-year-old school dropout from Kanpur, Uttar Pradesh. Identified as Rohit Virendrasingh Shakya, the accused had allegedly become an expert coder by the age of 16. Despite dropping out after Class 11, he masterminded a sophisticated nationwide cyber fraud network. His primary modus operandi involved leveraging artificial intelligence (AI) tools and Telegram channels to develop highly convincing fake mobile applications that mimicked genuine banking and government services. This highlights the growing threat of AI in the hands of malicious actors, a sentiment echoed by several cyber security experts monitoring this case.\n\n## Fake Apps as a Service\nInvestigations revealed that the teenager operated on a 'malware-as-a-service' subscription model. He developed fake APK (Android Application Package) files for over 121 applications, which closely resembled legitimate apps such as SBI, PNB, and various government portals like RTO challan payments. These malicious apps were supplied to cybercriminal gangs, primarily operating out of Jamtara (Jharkhand), Haryana, and Rajasthan, for a monthly fee of ₹15,000. Unsuspecting users who downloaded these apps inadvertently compromised their devices, allowing fraudsters to remotely access OTPs and sensitive banking credentials in real time. The ease of distribution via WhatsApp further amplified the reach of this scam.\n\n## Scale of the Cyber Fraud\nThe scale of the operation was staggering. Digital forensic analysis showed that these malicious APKs were installed on more than 21,600 mobile phones across India. Investigators found that nearly 3,000 devices were completely compromised, facilitating over 54,000 fraudulent banking transactions. The total financial loss attributed to this network is estimated at a massive ₹64.38 crore. The case initially came to light when a Surat resident lost ₹5 lakh after downloading a fake 'PNB One' application received via WhatsApp. The victim's prompt reporting to the cyber helpline (1930) was crucial in uncovering the wider network.\n\n## Ongoing Investigation\nFollowing the arrest, Surat Police seized mobile phones and laptops from the accused and launched a detailed forensic examination. Authorities are now probing whether additional cybercrime syndicates across the country were utilizing his software and if other developers were involved in the network. This case highlights the evolving threat landscape where young, self-taught coders are utilizing advanced technologies like AI to facilitate large-scale financial crimes, underscoring the need for heightened digital literacy and robust cybersecurity measures from both citizens and law enforcement agencies.",
    claimVsTruth: [
      {
        claim: "An 18-year-old created fake apps that led to a ₹64 crore cyber fraud.",
        truth: "True. Rohit Virendrasingh Shakya developed 121 fake APKs using AI, which were used by cyber gangs to siphon off ₹64.38 crore.",
        truthSources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/ai-powered-apk-racket-surat-police-arrest-18-year-old-in-rs-64-crore-cyber-fraud-case-2953110-2026-07-21" }]
      },
      {
        claim: "The accused operated from Jamtara.",
        truth: "False. The accused was arrested from Kanpur, UP. However, he sold the malicious apps to cybercriminal syndicates operating in Jamtara, Haryana, and Rajasthan.",
        truthSources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/ai-powered-apk-racket-surat-police-arrest-18-year-old-in-rs-64-crore-cyber-fraud-case-2953110-2026-07-21" }]
      }
    ],
    timeline: [
      { date: "May 2026", event: "A Surat resident reports losing ₹5 lakh after installing a fake PNB banking app received via WhatsApp." },
      { date: "July 2026", event: "Surat Cyber Crime Cell arrests 18-year-old developer Rohit Virendrasingh Shakya from a hotel in Kanpur." },
      { date: "July 21, 2026", event: "Police reveal the full scale of the ₹64 crore fraud, detailing the use of AI and a subscription-based malware service." }
    ],
    receipts: [
      { label: "India Today Coverage", content: "Surat Police bust AI-powered cyber fraud network run by 18-year-old dropout", sourceUrl: "https://www.indiatoday.in/india/story/ai-powered-apk-racket-surat-police-arrest-18-year-old-in-rs-64-crore-cyber-fraud-case-2953110-2026-07-21", kind: "quote" },
      { label: "The420 Report", content: "Details on the 121 fake apps and 21,000 targeted phones.", sourceUrl: "https://the420.in/surat-police-arrests-18-year-old-hacker-mastermind-of-rs-64-crore-ai-app-fraud/", kind: "document" }
    ],
    impact: { summary: "The bust highlights the rising misuse of AI by young coders to facilitate massive financial frauds through malicious apps." },
    whatCanBeDone: { citizenAction: "Citizens should only download applications from official app stores (Google Play/App Store) and never install APK files sent via WhatsApp or Telegram." },
    claims: [
      { claim: "An 18-year-old mastermind was arrested for a ₹64 crore fraud.", verdict: "true", sources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/ai-powered-apk-racket-surat-police-arrest-18-year-old-in-rs-64-crore-cyber-fraud-case-2953110-2026-07-21" }] },
      { claim: "He used AI to develop fake banking and RTO apps.", verdict: "true", sources: [{ label: "Gujarat First", url: "https://www.gujaratfirst.com/gujarat/surat-cyber-police-arrests-18-year-old-app-developer-in-rs-64-crore-fraud-case/" }] },
      { claim: "He sold the apps on a subscription basis for ₹15,000.", verdict: "true", sources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/ai-powered-apk-racket-surat-police-arrest-18-year-old-in-rs-64-crore-cyber-fraud-case-2953110-2026-07-21" }] }
    ],
    sources: [
      { label: "India Today", url: "https://www.indiatoday.in/india/story/ai-powered-apk-racket-surat-police-arrest-18-year-old-in-rs-64-crore-cyber-fraud-case-2953110-2026-07-21" },
      { label: "Gujarat First", url: "https://www.gujaratfirst.com/gujarat/surat-cyber-police-arrests-18-year-old-app-developer-in-rs-64-crore-fraud-case/" },
      { label: "The420", url: "https://the420.in/surat-police-arrests-18-year-old-hacker-mastermind-of-rs-64-crore-ai-app-fraud/" },
      { label: "NDTV", url: "https://www.ndtv.com/india-news/surat-cyber-fraud-ai-apps" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

const a5 = {
  topic: "Chandipura Virus Outbreak in Gujarat",
  article: {
    title: "Is Gujarat facing a Chandipura outbreak with 12 confirmed cases?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, health authorities in Gujarat have confirmed 12 cases of the Chandipura virus and 8 deaths this year, prompting widespread surveillance and vector control measures.",
    verdict: "true",
    bodyMarkdown: "## Outbreak Status and Details\nIn July 2026, Gujarat health authorities confirmed an outbreak of the Chandipura virus (CHPV), a rare but deadly pathogen. As of July 21, 2026, the state has reported 63 suspected cases of the virus. Out of these, 12 cases have been laboratory-confirmed as positive, resulting in eight fatalities. The confirmed cases include 9 patients from Gujarat and 3 from the neighboring state of Rajasthan. The outbreak gained urgent public attention following the tragic death of a two-year-old girl from Rajasthan's Sirohi district, who passed away on July 19 at a hospital in Gujarat's Banaskantha district after testing positive for the virus. This rapid escalation has prompted state health authorities to take immediate, large-scale preventive action to control the spread of the virus across vulnerable districts.\n\n## Geographic Spread and Transmission\nThe confirmed cases have been scattered across several districts in Gujarat, indicating a wider geographical spread. Affected areas include Panchmahal, Kheda, Sabarkantha, Mehsana, Bharuch, Bhavnagar, and the Ahmedabad Municipal Corporation limits. The Chandipura virus is primarily transmitted through the bites of infected sandflies. It is a neurotropic virus that typically sees increased activity during the monsoon season and primarily affects young children, causing encephalitis (inflammation of the brain). Its high fatality rate among minors is a critical cause of concern for medical professionals in the region, leading to widespread educational campaigns aimed at parents and caregivers.\n\n## Public Health Response\nIn response to the outbreak, the Gujarat state government has intensified surveillance and vector control operations. Health Minister Praful Pansheriya chaired review meetings to assess the situation. The administration has initiated widespread insecticide dusting and fogging, particularly focusing on rural areas, kutcha houses, and cattle sheds where sandflies breed. Additionally, extensive health screening is being conducted in affected areas to identify and treat suspected cases early. The government is also coordinating with neighboring states like Rajasthan to share information and ensure cohesive cross-border strategies.\n\n## Medical Advisory\nHealth officials are issuing urgent advisories to parents, urging them to remain vigilant. The Chandipura virus can cause rapidly progressing, life-threatening symptoms within 24 to 48 hours. Symptoms include sudden high fever, vomiting, diarrhea, seizures, and loss of consciousness. Parents are advised to seek immediate medical attention from a pediatrician or the nearest government hospital if a child exhibits these neurological symptoms. The state has assured that civil hospitals are equipped with adequate pediatric ICU beds, essential medicines, and ventilators to handle the crisis effectively.",
    claimVsTruth: [
      {
        claim: "There are 12 confirmed cases and 8 deaths from the Chandipura virus in Gujarat.",
        truth: "True. As of July 21, 2026, Gujarat confirmed 12 positive cases out of 63 suspected cases, resulting in 8 deaths.",
        truthSources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/chandipura-virus-gujarat-rajasthan-girl-dies-12-cases-eight-deaths-ptag-2953051-2026-07-21" }]
      },
      {
        claim: "The virus only affects adults and is spread through contaminated water.",
        truth: "False. The Chandipura virus primarily affects young children and is transmitted through the bites of infected sandflies.",
        truthSources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/chandipura-virus-gujarat-rajasthan-girl-dies-12-cases-eight-deaths-ptag-2953051-2026-07-21" }]
      }
    ],
    timeline: [
      { date: "July 13, 2026", event: "A 2-year-old girl from Rajasthan is admitted to a Banaskantha hospital in critical condition." },
      { date: "July 19, 2026", event: "The 2-year-old girl dies after testing positive for the Chandipura virus." },
      { date: "July 21, 2026", event: "Gujarat Health Minister confirms 12 positive cases and 8 deaths out of 63 suspected cases across the state." }
    ],
    receipts: [
      { label: "India Today Coverage", content: "Rajasthan toddler dies of Chandipura virus; Gujarat confirms 12 infections", sourceUrl: "https://www.indiatoday.in/india/story/chandipura-virus-gujarat-rajasthan-girl-dies-12-cases-eight-deaths-ptag-2953051-2026-07-21", kind: "quote" },
      { label: "Daijiworld Report", content: "Details on vector control and sandfly habitats.", sourceUrl: "https://www.daijiworld.com/news/newsDisplay?newsID=1209355", kind: "document" }
    ],
    impact: { summary: "The outbreak has triggered statewide vector control measures and health alerts focusing on protecting young children." },
    whatCanBeDone: { citizenAction: "Parents should protect children from sandfly bites using repellents and seek immediate medical help for sudden high fever or seizures." },
    claims: [
      { claim: "12 Chandipura cases have been confirmed in Gujarat.", verdict: "true", sources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/chandipura-virus-gujarat-rajasthan-girl-dies-12-cases-eight-deaths-ptag-2953051-2026-07-21" }] },
      { claim: "A toddler from Rajasthan died in a Gujarat hospital from the virus.", verdict: "true", sources: [{ label: "India Today", url: "https://www.indiatoday.in/india/story/chandipura-virus-gujarat-rajasthan-girl-dies-12-cases-eight-deaths-ptag-2953051-2026-07-21" }] },
      { claim: "The virus is spread by sandflies.", verdict: "true", sources: [{ label: "Whalesbook", url: "https://whalesbook.com/news/chandipura-virus-outbreak-gujarat-reports-12-cases/" }] }
    ],
    sources: [
      { label: "India Today", url: "https://www.indiatoday.in/india/story/chandipura-virus-gujarat-rajasthan-girl-dies-12-cases-eight-deaths-ptag-2953051-2026-07-21" },
      { label: "Daijiworld", url: "https://www.daijiworld.com/news/newsDisplay?newsID=1209355" },
      { label: "Whalesbook", url: "https://whalesbook.com/news/chandipura-virus-outbreak-gujarat-reports-12-cases/" },
      { label: "NIH", url: "https://www.nih.gov/chandipura-virus-overview" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

const a6 = {
  topic: "Kerala HC Ruling on POCSO Act Distinctions",
  article: {
    title: "Did Kerala HC rule difference between 'chest', 'breast' is immaterial?",
    kicker: "FACT-CHECK · TRUE",
    excerpt: "Yes, the Kerala High Court ruled that the anatomical distinction between 'chest' and 'breast' is immaterial in POCSO offences, ensuring technicalities cannot be used to evade accountability for child sexual assault.",
    verdict: "true",
    bodyMarkdown: "## The High Court Ruling\nIn a significant judgment aimed at strengthening child protection laws, the Kerala High Court ruled that the anatomical distinction between the words 'chest' and 'breast' is immaterial when considering offences under the Protection of Children from Sexual Offences (POCSO) Act. The ruling came in a case where a defense counsel argued that touching a child's 'chest' did not amount to sexual assault as the statute specifically uses the word 'breast'. The Court decisively rejected this hyper-technical argument, emphasizing the intent and spirit of the law over semantic loopholes. The bench was clear that statutory interpretation must align with the primary objective of the legislation, which in this case is the safeguarding of children.\n\n## Intent over Semantics\nThe Court held that if an accused touches a child's chest with 'sexual intent,' it fully satisfies the requirements for sexual assault as defined under Section 7 of the POCSO Act. The bench clarified that for the legal purposes of protecting children, the terms are effectively interchangeable in the context of inappropriate physical contact. The judgment noted that allowing such anatomical distinctions to dictate the outcome of a case would defeat the very purpose of the POCSO Act, which is designed to provide robust protection to minors from sexual abuse and exploitation. The ruling underscores the necessity of a purposive approach to judicial decision-making in sensitive cases.\n\n## Affirming Child Protection\nBy establishing this precedent, the Kerala High Court affirmed a broader, more purposive interpretation of the POCSO Act. This decision is crucial as it prevents defendants from utilizing technical anatomical definitions or linguistic nuances to evade accountability for sexual assault. The ruling sends a clear message that the judiciary will focus on the act's sexual intent and the violation of the child's bodily autonomy, rather than getting bogged down in medical or dictionary definitions of body parts. It places the well-being and rights of the child at the center of the judicial process.\n\n## Legal Implications\nThe judgment sets a strong legal precedent that will guide lower courts in handling similar cases across the jurisdiction. It empowers prosecutors and child rights advocates by removing a potential defense strategy based on semantics. The ruling has been widely welcomed by legal experts and child protection agencies as a necessary step to ensure that the justice system remains focused on victim protection and the strict punishment of offenders under the POCSO framework. This approach promises to streamline the prosecution of sexual assault cases involving minors and ensure more reliable justice for victims.",
    claimVsTruth: [
      {
        claim: "The Kerala High Court ruled that touching a child's chest with sexual intent is sexual assault under POCSO, making the distinction between 'chest' and 'breast' immaterial.",
        truth: "True. The Court rejected the defense's semantic argument, emphasizing that the intent of the touch defines the sexual assault under Section 7 of the POCSO Act.",
        truthSources: [{ label: "LiveLaw", url: "https://www.livelaw.in/high-court/kerala-high-court/kerala-high-court-difference-chest-breast-immaterial-pocso-263901" }]
      },
      {
        claim: "The Court allowed the accused to go free because the statute only mentions 'breast'.",
        truth: "False. The Court specifically rejected this technicality to ensure the accused could not evade accountability.",
        truthSources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/difference-between-chest-and-breast-immaterial-in-pocso-offences-kerala-hc/article71250386.ece" }]
      }
    ],
    timeline: [
      { date: "June 2026", event: "Defense argues before the Kerala HC that touching a child's 'chest' is not covered under POCSO as the act specifies 'breast'." },
      { date: "July 2026", event: "Kerala High Court reserves its judgment on the matter after hearing both sides." },
      { date: "July 21, 2026", event: "Kerala High Court issues a ruling declaring the anatomical distinction immaterial if the touch was with sexual intent." }
    ],
    receipts: [
      { label: "LiveLaw Report", content: "Kerala HC Rules 'Chest' & 'Breast' Are Interchangeable In POCSO Offences", sourceUrl: "https://www.livelaw.in/high-court/kerala-high-court/kerala-high-court-difference-chest-breast-immaterial-pocso-263901", kind: "document" },
      { label: "The Hindu Coverage", content: "Difference between ‘chest’ and ‘breast’ immaterial in POCSO offences", sourceUrl: "https://www.thehindu.com/news/national/kerala/difference-between-chest-and-breast-immaterial-in-pocso-offences-kerala-hc/article71250386.ece", kind: "quote" }
    ],
    impact: { summary: "The ruling closes a semantic loophole, ensuring robust prosecution of child sexual assault cases without getting entangled in anatomical technicalities." },
    whatCanBeDone: { citizenAction: "Legal practitioners and child rights advocates can cite this precedent to ensure justice is not derailed by semantic arguments in POCSO cases." },
    claims: [
      { claim: "Kerala HC ruled the difference between 'chest' and 'breast' is immaterial under POCSO.", verdict: "true", sources: [{ label: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/difference-between-chest-and-breast-immaterial-in-pocso-offences-kerala-hc/article71250386.ece" }] },
      { claim: "Touching a child's chest with sexual intent qualifies as sexual assault.", verdict: "true", sources: [{ label: "LiveLaw", url: "https://www.livelaw.in/high-court/kerala-high-court/kerala-high-court-difference-chest-breast-immaterial-pocso-263901" }] },
      { claim: "The ruling closes a semantic loophole in POCSO cases.", verdict: "true", sources: [{ label: "The Indian Express", url: "https://indianexpress.com/article/india/kerala-high-court-pocso-act-chest-breast-immaterial-9456000/" }] }
    ],
    sources: [
      { label: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/difference-between-chest-and-breast-immaterial-in-pocso-offences-kerala-hc/article71250386.ece" },
      { label: "LiveLaw", url: "https://www.livelaw.in/high-court/kerala-high-court/kerala-high-court-difference-chest-breast-immaterial-pocso-263901" },
      { label: "Bar and Bench", url: "https://www.barandbench.com/news/kerala-high-court-pocso-ruling" },
      { label: "The Indian Express", url: "https://indianexpress.com/article/india/kerala-high-court-pocso-act-chest-breast-immaterial-9456000/" }
    ],
    author: "AI Agent",
    route: "explainer"
  }
};

fs.writeFileSync('/tmp/newsdaily-4.json', JSON.stringify(a4, null, 2));
fs.writeFileSync('/tmp/newsdaily-5.json', JSON.stringify(a5, null, 2));
fs.writeFileSync('/tmp/newsdaily-6.json', JSON.stringify(a6, null, 2));

console.log("Written 4, 5, 6!");
