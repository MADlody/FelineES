/**
 * Feline Neurological Diagnosis Expert System - Expanded Knowledge Base (30 Rules)
 * 
 * CRITICAL: This system implements PRIORITY WATERFALL LOGIC
 * - Rules are evaluated in STRICT ORDER (Priority 1-30)
 * - The FIRST matching rule determines the diagnosis
 * - Lower priority rules are IGNORED once a match is found
 * - System returns EXACTLY ONE diagnosis per evaluation
 * 
 * SEIZURE CLASSIFICATION:
 * - none: No seizure activity observed
 * - mild: Focal twitching, fly-biting, tremors, spacing out
 * - severe: Full body convulsions, paddling, loss of consciousness
 */

console.log('📊 Loading FelineNeuroDiagnosisData...');

const FelineNeuroDiagnosisData = {
    
    /**
     * PRIORITY DIAGNOSTIC RULES (1-30)
     * 
     * IMPORTANT: These rules MUST be evaluated in the exact order listed below.
     * The engine will stop at the FIRST matching rule and return that diagnosis.
     * This implements the "Single Output" requirement with waterfall logic.
     */
    diagnosticRules: [
        
        // --- TIER 1: CRITICAL / TRAUMA (Rules 1-5) ---
        
        // PRIORITY 1: TRAUMATIC BRAIN INJURY (Highest Priority)
        {
            priority: 1,
            id: 'TRAUMATIC_BRAIN_INJURY',
            name: 'Traumatic Brain Injury',
            
            // Rule Logic: Recent trauma AND severe seizures (indicates brain bleed/swelling)
            condition: (inputs) => {
                return inputs.recent_trauma === true && inputs.seizures === 'severe';
            },
            
            description: 'Critical brain trauma with severe seizures indicating intracranial bleeding or swelling',
            
            clinicalNotes: [
                'Severe seizures after trauma indicate significant brain injury',
                'May involve intracranial hemorrhage or cerebral edema',
                'Requires immediate neurosurgical evaluation',
                'Prognosis depends on extent of brain damage and response to treatment'
            ],
            
            nextSteps: [
                'EMERGENCY: Immediate veterinary neurosurgical consultation',
                'IV mannitol or hypertonic saline to reduce brain swelling',
                'Advanced imaging (CT/MRI) to assess bleeding and swelling',
                'Intensive care monitoring with seizure control medications'
            ],
            
            urgency: 'EMERGENCY',
            icon: 'fa-brain',
            color: '#dc2626'
        },

        // PRIORITY 2: SPINAL FRACTURE
        {
            priority: 2,
            id: 'SPINAL_FRACTURE',
            name: 'Spinal Fracture',
            
            // Rule Logic: Recent trauma AND paralyzed mobility
            condition: (inputs) => {
                return inputs.recent_trauma === true && inputs.mobility_status === 'paralyzed';
            },
            
            description: 'Traumatic spinal cord injury with complete loss of motor function', 
           
            clinicalNotes: [
                'Paralysis after trauma suggests vertebral fracture or dislocation',
                'Spinal cord compression requires immediate stabilization',
                'Prognosis depends on completeness of injury and time to treatment',
                'May require surgical stabilization and decompression'
            ],
            
            nextSteps: [
                'EMERGENCY: Immediate spinal immobilization',
                'Do not move cat unnecessarily - transport on rigid board',
                'Emergency spinal radiographs and CT scan',
                'Neurosurgical consultation for potential decompression surgery'
            ],
            
            urgency: 'EMERGENCY',
            icon: 'fa-spine',
            color: '#dc2626'
        },

        // PRIORITY 3: GENERAL TRAUMA
        {
            priority: 3,
            id: 'GENERAL_TRAUMA',
            name: 'General Traumatic Injury',
            
            // Rule Logic: Any recent trauma (catches all other trauma cases)
            condition: (inputs) => {
                return inputs.recent_trauma === true;
            },
            
            description: 'Neurological signs secondary to recent physical trauma',
            
            clinicalNotes: [
                'Trauma can cause various neurological deficits',
                'May involve brain contusion, spinal cord injury, or peripheral nerve damage',
                'Requires systematic neurological assessment',
                'Secondary complications may develop over 24-48 hours'
            ],
            
            nextSteps: [
                'EMERGENCY: Immediate trauma assessment and stabilization',
                'Complete neurological examination to localize injury',
                'Supportive care and pain management',
                'Monitor for deterioration and secondary complications'
            ],
            
            urgency: 'EMERGENCY',
            icon: 'fa-car-crash',
            color: '#dc2626'
        },

        // PRIORITY 4: SADDLE THROMBUS
        {
            priority: 4,
            id: 'SADDLE_THROMBUS',
            name: 'Feline Aortic Thromboembolism (Saddle Thrombus)',
            
            // Rule Logic: Abnormal mobility + pain + cold limbs
            condition: (inputs) => {
                return inputs.mobility_status !== 'normal' && 
                       inputs.pain_signs === true && 
                       inputs.cold_limbs === true;
            },
            
            description: 'Blood clot blocking aortic blood flow to hind limbs - extremely painful emergency',
            
            clinicalNotes: [
                'Classic triad: paralysis, pain, and cold limbs',
                'Often secondary to underlying heart disease (cardiomyopathy)',
                'Clot typically lodges at aortic bifurcation',
                'Time-critical condition - tissue death occurs within hours'
            ],
            
            nextSteps: [
                'EMERGENCY: Rush to emergency clinic immediately',
                'Aggressive pain management (opioids)',
                'Anticoagulation therapy and clot-busting medications',
                'Cardiac evaluation to identify underlying disease'
            ],
            
            urgency: 'EMERGENCY',
            icon: 'fa-heart-broken',
            color: '#dc2626'
        },

        // PRIORITY 5: ACUTE TOXICITY
        {
            priority: 5,
            id: 'ACUTE_TOXICITY',
            name: 'Acute Toxicity (Poisoning)',
            
            // Rule Logic: Sudden onset + severe seizures + eye signs
            condition: (inputs) => {
                return inputs.onset_speed === 'sudden' && 
                       inputs.seizures === 'severe' && 
                       inputs.eye_signs === true;
            },
            
            description: 'Severe neurological reaction to toxic substances',
            
            clinicalNotes: [
                'Severe seizures with eye signs suggest neurotoxicity',
                'Common toxins: permethrin, lilies, antifreeze, chocolate',
                'Dilated pupils and tremors are classic signs',
                'Rapid progression can be fatal without immediate treatment'
            ],
            
            nextSteps: [
                'EMERGENCY: Immediate decontamination and supportive care',
                'Bring suspected toxin packaging to vet',
                'Activated charcoal if recent ingestion',
                'Seizure control and intensive monitoring'
            ],
            
            urgency: 'EMERGENCY',
            icon: 'fa-skull-crossbones',
            color: '#dc2626'
        },

        // --- TIER 2: METABOLIC & ACUTE (Rules 6-11) ---

        // PRIORITY 6: HYPOGLYCEMIA
        {
            priority: 6,
            id: 'HYPOGLYCEMIA',
            name: 'Severe Hypoglycemia',
            
            // Rule Logic: Kitten + sudden onset + any seizures
            condition: (inputs) => {
                return inputs.age_group === 'kitten' && 
                       inputs.onset_speed === 'sudden' && 
                       inputs.seizures !== 'none';
            },
            
            description: 'Critically low blood sugar causing neurological dysfunction',
            
            clinicalNotes: [
                'Kittens have limited glycogen stores and are prone to hypoglycemia',
                'Blood glucose typically below 60 mg/dL',
                'Can progress rapidly from mild signs to coma',
                'Often occurs with stress, illness, or inadequate nutrition'
            ],
            
            nextSteps: [
                'IMMEDIATE: Rub honey or corn syrup on gums',
                'Transport to veterinarian urgently',
                'IV dextrose administration',
                'Identify and treat underlying cause'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-candy-cane',
            color: '#ef4444'
        },

        // PRIORITY 7: THIAMINE DEFICIENCY
        {
            priority: 7,
            id: 'THIAMINE_DEFICIENCY',
            name: 'Thiamine Deficiency (Vitamin B1)',
            
            // Rule Logic: Neck flexion present (pathognomonic sign)
            condition: (inputs) => {
                return inputs.neck_flexion === true;
            },
            
            description: 'Nutritional deficiency causing characteristic neck curling and neurological signs',
            
            clinicalNotes: [
                'Neck ventroflexion is pathognomonic for thiamine deficiency',
                'Often caused by raw fish diets containing thiaminase',
                'Can progress to seizures and death if untreated',
                'Reversible with prompt thiamine supplementation'
            ],
            
            nextSteps: [
                'Review diet history immediately',
                'Thiamine injections (vitamin B1)',
                'Discontinue raw fish diet',
                'Monitor for improvement within 24-48 hours'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-fish',
            color: '#f59e0b'
        },

        // PRIORITY 8: HYPERTENSION
        {
            priority: 8,
            id: 'HYPERTENSION',
            name: 'Systemic Hypertension (High Blood Pressure)',
            
            // Rule Logic: Senior + sudden + (mild seizures OR eye signs) + normal mobility
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.onset_speed === 'sudden' && 
                       (inputs.seizures === 'mild' || inputs.eye_signs === true) && 
                       inputs.mobility_status === 'normal';
            },
            
            description: 'High blood pressure causing acute neurological signs in senior cats',
            
            clinicalNotes: [
                'Mild seizures in seniors with sudden onset often indicate hypertension',
                'Can cause retinal hemorrhages and acute blindness',
                'Often secondary to kidney disease or hyperthyroidism',
                'Blood pressure typically >180 mmHg systolic'
            ],
            
            nextSteps: [
                'Blood pressure measurement',
                'Fundic examination for retinal changes',
                'Antihypertensive medication (amlodipine)',
                'Investigate underlying causes (kidney, thyroid)'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-heartbeat',
            color: '#ef4444'
        },

        // PRIORITY 9: HEPATIC ENCEPHALOPATHY
        {
            priority: 9,
            id: 'HEPATIC_ENCEPHALOPATHY',
            name: 'Hepatic Encephalopathy (Liver Shunt)',
            
            // Rule Logic: (Kitten OR adult) + mild seizures + wobbly mobility
            condition: (inputs) => {
                return (inputs.age_group === 'kitten' || inputs.age_group === 'adult') && 
                       inputs.seizures === 'mild' && 
                       inputs.mobility_status === 'wobbly';
            },
            
            description: 'Liver dysfunction causing toxic buildup and neurological signs',
            
            clinicalNotes: [
                'Portosystemic shunts bypass liver detoxification',
                'Ammonia buildup causes neurological dysfunction',
                'Often presents with mild seizures and ataxia',
                'May be congenital (young cats) or acquired (liver disease)'
            ],
            
            nextSteps: [
                'Liver function tests (bile acids, ammonia)',
                'Abdominal ultrasound to identify shunt',
                'Low-protein diet and lactulose',
                'Surgical shunt ligation if appropriate'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-liver',
            color: '#f59e0b'
        },

        // PRIORITY 10: ACUTE HYPOCALCEMIA
        {
            priority: 10,
            id: 'HYPOCALCEMIA',
            name: 'Acute Hypocalcemia (Eclampsia)',
            
            // Rule Logic: Sudden onset + mild seizures + wobbly mobility
            condition: (inputs) => {
                return inputs.onset_speed === 'sudden' && 
                       inputs.seizures === 'mild' && 
                       inputs.mobility_status === 'wobbly';
            },
            
            description: 'Low blood calcium causing muscle tremors and mild seizures',
            
            clinicalNotes: [
                'Often occurs in nursing queens or cats with parathyroid disease',
                'Causes muscle fasciculations and mild seizure activity',
                'Can progress to tetany and severe seizures',
                'Responds rapidly to calcium supplementation'
            ],
            
            nextSteps: [
                'Serum calcium measurement',
                'IV calcium gluconate (slowly)',
                'Identify underlying cause (lactation, parathyroid)',
                'Monitor for cardiac arrhythmias during treatment'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-bone',
            color: '#ef4444'
        },

        // PRIORITY 11: BOTULISM/TICK PARALYSIS
        {
            priority: 11,
            id: 'BOTULISM_TICK_PARALYSIS',
            name: 'Botulism / Tick Paralysis',
            
            // Rule Logic: Paralyzed + no pain + sudden onset + no seizures
            condition: (inputs) => {
                return inputs.mobility_status === 'paralyzed' && 
                       inputs.pain_signs === false && 
                       inputs.onset_speed === 'sudden' && 
                       inputs.seizures === 'none';
            },
            
            description: 'Flaccid paralysis without pain from neurotoxins or tick-borne toxins',
            
            clinicalNotes: [
                'Ascending flaccid paralysis without pain or seizures',
                'Botulism from spoiled food or wound contamination',
                'Tick paralysis from neurotoxic tick species',
                'Preserved consciousness with motor paralysis'
            ],
            
            nextSteps: [
                'Thorough examination for attached ticks',
                'Remove any ticks found',
                'Supportive care and respiratory monitoring',
                'Consider botulism antitoxin if available'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-bug',
            color: '#ef4444'
        },
        
        // --- TIER 3: INFECTIOUS & INFLAMMATORY (Rules 12-16) ---

        // PRIORITY 12: NEURO FIP
        {
            priority: 12,
            id: 'NEURO_FIP',
            name: 'Feline Infectious Peritonitis (Neurological Form)',
            
            // Rule Logic: Kitten + gradual onset + (wobbly OR mild seizures)
            condition: (inputs) => {
                return inputs.age_group === 'kitten' && 
                       inputs.onset_speed === 'gradual' && 
                       (inputs.mobility_status === 'wobbly' || inputs.seizures === 'mild');
            },
            
            description: 'Viral infection causing progressive neurological inflammation in young cats',
            
            clinicalNotes: [
                'Mutated feline coronavirus causes granulomatous CNS inflammation',
                'Most common in kittens and young cats under 2 years',
                'Progressive course with gradual worsening',
                'Often fatal without aggressive antiviral treatment'
            ],
            
            nextSteps: [
                'FIP diagnostic panel (A:G ratio, PCR testing)',
                'Advanced imaging to assess CNS inflammation',
                'Consider GS-441524 antiviral treatment if available',
                'Supportive care and corticosteroids'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-virus',
            color: '#ef4444'
        },

        // PRIORITY 13: TOXOPLASMOSIS
        {
            priority: 13,
            id: 'TOXOPLASMOSIS',
            name: 'Toxoplasmosis',
            
            // Rule Logic: Not senior + gradual onset + eye signs
            condition: (inputs) => {
                return inputs.age_group !== 'senior' && 
                       inputs.onset_speed === 'gradual' && 
                       inputs.eye_signs === true;
            },
            
            description: 'Protozoal infection causing neurological and ocular signs',
            
            clinicalNotes: [
                'Toxoplasma gondii can cause CNS and ocular disease',
                'More common in younger cats and immunocompromised animals',
                'Eye signs often accompany neurological symptoms',
                'Responds well to appropriate antiprotozoal therapy'
            ],
            
            nextSteps: [
                'Toxoplasma IgG and IgM antibody testing',
                'Ophthalmologic examination',
                'Clindamycin or trimethoprim-sulfa treatment',
                'Monitor for improvement over 2-4 weeks'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-eye',
            color: '#f59e0b'
        },

        // PRIORITY 14: OTITIS INTERNA
        {
            priority: 14,
            id: 'OTITIS_INTERNA',
            name: 'Otitis Interna (Inner Ear Infection)',
            
            // Rule Logic: Ear issues + (head tilt OR wobbly mobility)
            condition: (inputs) => {
                return inputs.ear_issues === true && 
                       (inputs.head_tilt === true || inputs.mobility_status === 'wobbly');
            },
            
            description: 'Deep ear infection affecting the vestibular system and balance',
            
            clinicalNotes: [
                'Extension of middle ear infection to inner ear structures',
                'Affects vestibular system causing balance problems',
                'May be associated with facial nerve paralysis',
                'Requires aggressive systemic antibiotic therapy'
            ],
            
            nextSteps: [
                'Otoscopic examination and ear cytology',
                'Culture and sensitivity testing',
                'Systemic antibiotics (fluoroquinolones)',
                'Consider ear flushing under anesthesia'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-ear-listen',
            color: '#f59e0b'
        },

        // PRIORITY 15: NASOPHARYNGEAL POLYP
        {
            priority: 15,
            id: 'NASOPHARYNGEAL_POLYP',
            name: 'Nasopharyngeal Polyp',
            
            // Rule Logic: (Kitten OR adult) + ear issues + head tilt + gradual onset
            condition: (inputs) => {
                return (inputs.age_group === 'kitten' || inputs.age_group === 'adult') && 
                       inputs.ear_issues === true && 
                       inputs.head_tilt === true && 
                       inputs.onset_speed === 'gradual';
            },
            
            description: 'Benign growth in nasopharynx causing ear and vestibular signs',
            
            clinicalNotes: [
                'Inflammatory polyps can extend into middle ear',
                'More common in young cats',
                'Causes progressive vestibular signs',
                'Surgical removal is curative'
            ],
            
            nextSteps: [
                'Otoscopic examination to visualize polyp',
                'CT scan to assess extent',
                'Surgical removal via ventral bulla osteotomy',
                'Post-operative antibiotic therapy'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-seedling',
            color: '#f59e0b'
        },

        // PRIORITY 16: MENINGITIS/ENCEPHALITIS
        {
            priority: 16,
            id: 'MENINGITIS_ENCEPHALITIS',
            name: 'Meningitis/Encephalitis',
            
            // Rule Logic: Sudden onset + pain + any seizures (neck pain + seizures)
            condition: (inputs) => {
                return inputs.onset_speed === 'sudden' && 
                       inputs.pain_signs === true && 
                       inputs.seizures !== 'none';
            },
            
            description: 'Inflammation of brain and/or meninges causing pain and seizures',
            
            clinicalNotes: [
                'Combination of neck pain and seizures suggests meningeal irritation',
                'Can be infectious (bacterial, viral) or immune-mediated',
                'Requires aggressive anti-inflammatory treatment',
                'CSF analysis may be diagnostic but risky if increased pressure'
            ],
            
            nextSteps: [
                'High-dose corticosteroids',
                'Broad-spectrum antibiotics pending culture',
                'Seizure control medications',
                'Consider CSF analysis if stable'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-fire',
            color: '#ef4444'
        },
        
        // --- TIER 4: STRUCTURAL & TUMORS (Rules 17-21) ---

        // PRIORITY 17: BRAIN TUMOR (MENINGIOMA)
        {
            priority: 17,
            id: 'BRAIN_TUMOR_MENINGIOMA',
            name: 'Brain Tumor (Meningioma)',
            
            // Rule Logic: Senior + gradual onset + mild seizures
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.onset_speed === 'gradual' && 
                       inputs.seizures === 'mild';
            },
            
            description: 'Benign brain tumor causing progressive mild neurological signs',
            
            clinicalNotes: [
                'Meningiomas are most common primary brain tumor in cats',
                'Typically cause mild, progressive seizures',
                'Often amenable to surgical resection',
                'Better prognosis than high-grade tumors'
            ],
            
            nextSteps: [
                'MRI with contrast for tumor characterization',
                'Seizure control with anticonvulsants',
                'Surgical consultation for resection',
                'Radiation therapy if surgery not feasible'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-brain',
            color: '#ef4444'
        },

        // PRIORITY 18: HIGH-GRADE BRAIN TUMOR
        {
            priority: 18,
            id: 'HIGH_GRADE_BRAIN_TUMOR',
            name: 'High-Grade Brain Tumor',
            
            // Rule Logic: Senior + gradual onset + severe seizures
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.onset_speed === 'gradual' && 
                       inputs.seizures === 'severe';
            },
            
            description: 'Aggressive brain tumor causing severe progressive neurological signs',
            
            clinicalNotes: [
                'Severe seizures in seniors suggest high-grade malignancy',
                'May be primary (glioma) or metastatic',
                'Rapid progression and poor prognosis',
                'Palliative care often most appropriate'
            ],
            
            nextSteps: [
                'MRI to characterize tumor',
                'Aggressive seizure control',
                'Palliative corticosteroids',
                'Quality of life assessment and family discussion'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-skull',
            color: '#ef4444'
        },

        // PRIORITY 19: SPINAL TUMOR (LYMPHOMA)
        {
            priority: 19,
            id: 'SPINAL_TUMOR_LYMPHOMA',
            name: 'Spinal Tumor (Lymphoma)',
            
            // Rule Logic: Senior + paralyzed + gradual onset
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.mobility_status === 'paralyzed' && 
                       inputs.onset_speed === 'gradual';
            },
            
            description: 'Spinal lymphoma causing progressive paralysis in senior cats',
            
            clinicalNotes: [
                'Lymphoma is most common spinal tumor in cats',
                'Causes progressive paralysis over weeks to months',
                'Usually not painful until advanced stages',
                'May respond to chemotherapy'
            ],
            
            nextSteps: [
                'Spinal MRI to localize tumor',
                'Biopsy for definitive diagnosis',
                'Chemotherapy protocol if lymphoma confirmed',
                'Radiation therapy for local control'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-dna',
            color: '#ef4444'
        },

        // PRIORITY 20: SPINAL TUMOR (EARLY STAGE)
        {
            priority: 20,
            id: 'SPINAL_TUMOR_EARLY',
            name: 'Spinal Tumor (Early Stage)',
            
            // Rule Logic: Senior + wobbly + no pain + gradual onset
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.mobility_status === 'wobbly' && 
                       inputs.pain_signs === false && 
                       inputs.onset_speed === 'gradual';
            },
            
            description: 'Early-stage spinal tumor causing mild ataxia without pain',
            
            clinicalNotes: [
                'Early spinal tumors cause subtle ataxia before paralysis',
                'Lack of pain helps differentiate from IVDD',
                'Progressive worsening over weeks to months',
                'Earlier intervention may improve outcomes'
            ],
            
            nextSteps: [
                'Spinal MRI for early detection',
                'Neurological monitoring for progression',
                'Consider early intervention if tumor confirmed',
                'Supportive care and mobility assistance'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-search',
            color: '#f59e0b'
        },

        // PRIORITY 21: HYDROCEPHALUS
        {
            priority: 21,
            id: 'HYDROCEPHALUS',
            name: 'Hydrocephalus',
            
            // Rule Logic: Kitten + head tilt + mild seizures + gradual onset
            condition: (inputs) => {
                return inputs.age_group === 'kitten' && 
                       inputs.head_tilt === true && 
                       inputs.seizures === 'mild' && 
                       inputs.onset_speed === 'gradual';
            },
            
            description: 'Abnormal accumulation of cerebrospinal fluid in brain ventricles',
            
            clinicalNotes: [
                'Congenital or acquired CSF accumulation',
                'Causes progressive neurological deterioration',
                'May present with dome-shaped head in severe cases',
                'Requires neurosurgical intervention for treatment'
            ],
            
            nextSteps: [
                'MRI to assess ventricular size and CSF flow',
                'Neurosurgical consultation',
                'Ventriculoperitoneal shunt placement',
                'Long-term monitoring for shunt function'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-water',
            color: '#f59e0b'
        },
        
        // --- TIER 5: FUNCTIONAL & DEGENERATIVE (Rules 22-26) ---

        // PRIORITY 22: IVDD (DISC DISEASE)
        {
            priority: 22,
            id: 'IVDD',
            name: 'Intervertebral Disc Disease (IVDD)',
            
            // Rule Logic: Abnormal mobility + pain + sudden onset
            condition: (inputs) => {
                return inputs.mobility_status !== 'normal' && 
                       inputs.pain_signs === true && 
                       inputs.onset_speed === 'sudden';
            },
            
            description: 'Acute disc herniation causing spinal cord compression and pain',
            
            clinicalNotes: [
                'Sudden onset of pain with mobility loss is classic for IVDD',
                'Less common in cats than dogs but can be severe',
                'Thoracolumbar region most commonly affected',
                'Early intervention improves prognosis significantly'
            ],
            
            nextSteps: [
                'Strict cage rest immediately',
                'Pain management with opioids and anti-inflammatories',
                'Neurological examination to grade severity',
                'MRI and surgical consultation if severe'
            ],
            
            urgency: 'HIGH',
            icon: 'fa-spine',
            color: '#ef4444'
        },

        // PRIORITY 23: FELINE HYPERESTHESIA
        {
            priority: 23,
            id: 'FELINE_HYPERESTHESIA',
            name: 'Feline Hyperesthesia Syndrome',
            
            // Rule Logic: Adult + mild seizures + pain
            condition: (inputs) => {
                return inputs.age_group === 'adult' && 
                       inputs.seizures === 'mild' && 
                       inputs.pain_signs === true;
            },
            
            description: 'Neurological condition causing rolling skin syndrome and painful episodes',
            
            clinicalNotes: [
                'Also known as "rolling skin syndrome"',
                'Causes episodes of skin twitching and apparent pain',
                'May involve self-mutilation of tail or back',
                'Responds to anticonvulsants and behavioral modification'
            ],
            
            nextSteps: [
                'Rule out dermatological causes',
                'Anticonvulsant therapy (gabapentin)',
                'Environmental enrichment and stress reduction',
                'Behavioral modification techniques'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-hand-paper',
            color: '#f59e0b'
        },

        // PRIORITY 24: IDIOPATHIC EPILEPSY
        {
            priority: 24,
            id: 'IDIOPATHIC_EPILEPSY',
            name: 'Idiopathic Epilepsy',
            
            // Rule Logic: Adult + severe seizures + normal mobility
            condition: (inputs) => {
                return inputs.age_group === 'adult' && 
                       inputs.seizures === 'severe' && 
                       inputs.mobility_status === 'normal';
            },
            
            description: 'Primary seizure disorder with no identifiable structural cause',
            
            clinicalNotes: [
                'Diagnosis of exclusion after ruling out other causes',
                'Typically presents with generalized tonic-clonic seizures',
                'Normal between seizure episodes',
                'Good long-term prognosis with proper medication'
            ],
            
            nextSteps: [
                'Complete diagnostic workup to rule out other causes',
                'Anticonvulsant therapy (phenobarbital, levetiracetam)',
                'Regular monitoring of drug levels',
                'Seizure diary for frequency tracking'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-bolt',
            color: '#f59e0b'
        },

        // PRIORITY 25: DIABETIC NEUROPATHY
        {
            priority: 25,
            id: 'DIABETIC_NEUROPATHY',
            name: 'Diabetic Neuropathy',
            
            // Rule Logic: Senior + wobbly + gradual onset
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.mobility_status === 'wobbly' && 
                       inputs.onset_speed === 'gradual';
            },
            
            description: 'Peripheral nerve damage from uncontrolled diabetes causing plantigrade stance',
            
            clinicalNotes: [
                'Characteristic "flat-footed" walking on hocks',
                'Result of chronic hyperglycemia damaging peripheral nerves',
                'Often first sign of diabetes in cats',
                'Reversible with proper glucose control'
            ],
            
            nextSteps: [
                'Blood glucose and fructosamine testing',
                'Complete urinalysis',
                'Insulin therapy initiation',
                'Regular glucose monitoring and dietary management'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-syringe',
            color: '#f59e0b'
        },

        // PRIORITY 26: CEREBELLAR HYPOPLASIA
        {
            priority: 26,
            id: 'CEREBELLAR_HYPOPLASIA',
            name: 'Cerebellar Hypoplasia',
            
            // Rule Logic: Kitten + wobbly + gradual + no seizures
            condition: (inputs) => {
                return inputs.age_group === 'kitten' && 
                       inputs.mobility_status === 'wobbly' && 
                       inputs.onset_speed === 'gradual' && 
                       inputs.seizures === 'none';
            },
            
            description: 'Congenital underdevelopment of cerebellum causing coordination problems',
            
            clinicalNotes: [
                'Caused by in-utero panleukopenia virus infection',
                'Results in characteristic "wobbly" gait',
                'Non-progressive condition - cats can adapt well',
                'No treatment needed, just environmental modifications'
            ],
            
            nextSteps: [
                'MRI to confirm cerebellar underdevelopment',
                'Environmental modifications for safety',
                'No specific treatment required',
                'Good quality of life with proper care'
            ],
            
            urgency: 'LOW',
            icon: 'fa-baby',
            color: '#10b981'
        },

        // --- TIER 6: EXCLUSION (Rules 27-30) ---

        // PRIORITY 27: ISCHEMIC STROKE
        {
            priority: 27,
            id: 'ISCHEMIC_STROKE',
            name: 'Ischemic Stroke',
            
            // Rule Logic: Senior + sudden + head tilt + no ear issues
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.onset_speed === 'sudden' && 
                       inputs.head_tilt === true && 
                       inputs.ear_issues === false;
            },
            
            description: 'Acute loss of blood flow to brain region causing sudden neurological deficits',
            
            clinicalNotes: [
                'Sudden onset vestibular signs without ear disease',
                'More common in senior cats with underlying disease',
                'May be associated with hypertension or heart disease',
                'Prognosis depends on location and extent of infarct'
            ],
            
            nextSteps: [
                'MRI to identify infarct location',
                'Blood pressure monitoring and control',
                'Supportive care and physical therapy',
                'Investigate underlying cardiovascular disease'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-heartbeat',
            color: '#f59e0b'
        },

        // PRIORITY 28: IDIOPATHIC VESTIBULAR
        {
            priority: 28,
            id: 'IDIOPATHIC_VESTIBULAR',
            name: 'Idiopathic Vestibular Syndrome',
            
            // Rule Logic: Sudden + (head tilt OR eye signs) + wobbly
            condition: (inputs) => {
                return inputs.onset_speed === 'sudden' && 
                       (inputs.head_tilt === true || inputs.eye_signs === true) && 
                       inputs.mobility_status === 'wobbly';
            },
            
            description: 'Sudden vestibular dysfunction of unknown cause - feline "vertigo"',
            
            clinicalNotes: [
                'Sudden onset of severe balance problems',
                'Often dramatic presentation but good prognosis',
                'Most cases improve spontaneously over days to weeks',
                'Supportive care is usually sufficient'
            ],
            
            nextSteps: [
                'Supportive care with anti-nausea medication',
                'Protect from falls during recovery',
                'Monitor for improvement over 72 hours',
                'Consider MRI if no improvement'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-sync',
            color: '#f59e0b'
        },

        // PRIORITY 29: COGNITIVE DYSFUNCTION
        {
            priority: 29,
            id: 'COGNITIVE_DYSFUNCTION',
            name: 'Cognitive Dysfunction Syndrome (Dementia)',
            
            // Rule Logic: Senior + gradual + no seizures
            condition: (inputs) => {
                return inputs.age_group === 'senior' && 
                       inputs.onset_speed === 'gradual' && 
                       inputs.seizures === 'none';
            },
            
            description: 'Age-related cognitive decline similar to Alzheimer\'s disease in humans',
            
            clinicalNotes: [
                'Progressive behavioral and cognitive changes',
                'Signs include disorientation, altered sleep patterns',
                'Vocalization and house-soiling may occur',
                'Quality of life can be maintained with proper management'
            ],
            
            nextSteps: [
                'Complete geriatric health assessment',
                'Environmental enrichment and routine maintenance',
                'Consider cognitive supplements (SAMe, antioxidants)',
                'Behavioral management strategies'
            ],
            
            urgency: 'LOW',
            icon: 'fa-clock',
            color: '#10b981'
        },

        // PRIORITY 30: UNDETERMINED
        {
            priority: 30,
            id: 'UNDETERMINED',
            name: 'Undetermined Neurological Anomaly',
            
            // Rule Logic: Always true (catches all remaining cases)
            condition: (inputs) => {
                return true;
            },
            
            description: 'Neurological signs present but pattern does not match established diagnostic criteria',
            
            clinicalNotes: [
                'Clinical signs suggest neurological involvement',
                'Pattern does not match common feline neurological conditions',
                'May represent rare condition or atypical presentation',
                'Comprehensive diagnostic workup recommended'
            ],
            
            nextSteps: [
                'Referral to veterinary neurologist strongly recommended',
                'Comprehensive neurological examination',
                'Advanced imaging (MRI/CT) and CSF analysis',
                'Consider rare conditions and atypical presentations'
            ],
            
            urgency: 'MODERATE',
            icon: 'fa-question',
            color: '#6b7280'
        }
    ],

    /**
     * URGENCY LEVEL CONFIGURATIONS
     */
    urgencyLevels: {
        'EMERGENCY': {
            color: '#dc2626',
            bgColor: 'rgba(220, 38, 38, 0.1)',
            borderColor: '#dc2626',
            icon: 'fa-exclamation-triangle',
            label: 'EMERGENCY'
        },
        'HIGH': {
            color: '#ef4444',
            bgColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: '#ef4444',
            icon: 'fa-exclamation-circle',
            label: 'HIGH PRIORITY'
        },
        'MODERATE': {
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            borderColor: '#f59e0b',
            icon: 'fa-info-circle',
            label: 'MODERATE PRIORITY'
        },
        'LOW': {
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: '#10b981',
            icon: 'fa-check-circle',
            label: 'LOW PRIORITY'
        }
    },

    /**
     * INPUT FIELD DESCRIPTIONS
     */
    inputDescriptions: {
        age_group: {
            kitten: 'Cats under 1 year of age',
            adult: 'Cats between 1-7 years of age',
            senior: 'Cats over 7 years of age'
        },
        onset_speed: {
            sudden: 'Signs appeared within hours to days',
            gradual: 'Signs developed over weeks to months'
        },
        mobility_status: {
            normal: 'Cat walks and moves normally',
            wobbly: 'Unsteady gait, loss of coordination (ataxia)',
            paralyzed: 'Unable to walk, dragging limbs'
        },
        seizures: {
            none: 'No seizure activity observed',
            mild: 'Focal twitching, fly-biting, tremors, spacing out',
            severe: 'Full body convulsions, paddling, loss of consciousness'
        }
    }
};

console.log('✅ FelineNeuroDiagnosisData loaded successfully!');
console.log('📊 Data object:', typeof FelineNeuroDiagnosisData);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FelineNeuroDiagnosisData;
}