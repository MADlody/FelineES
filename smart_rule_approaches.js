/**
 * SMART RULE DESIGN APPROACHES
 * 
 * Instead of combinatorial explosion, use these proven medical AI techniques
 */

// APPROACH 1: HIERARCHICAL RULES WITH REQUIRED + OPTIONAL CRITERIA
const smartRule1 = {
    id: 'BRAIN_TUMOR_SMART',
    name: 'Brain Tumor (Smart Rule)',
    
    // Required criteria (must have ALL)
    requiredCriteria: [
        { field: 'age_group', value: 'senior' },
        { field: 'seizures', values: ['mild', 'severe'] }
    ],
    
    // Optional criteria (add weight for each present)
    optionalCriteria: [
        { field: 'onset_speed', value: 'gradual', weight: 50 },
        { field: 'eye_signs', value: true, weight: 30 },
        { field: 'head_tilt', value: true, weight: 40 }
    ],
    
    // Exclusion criteria (rule out if present)
    exclusionCriteria: [
        { field: 'recent_trauma', value: true },
        { field: 'neck_flexion', value: true }
    ],
    
    minimumScore: 100, // Need at least this score to match
    
    condition: function(inputs) {
        // Check required criteria first
        for (let req of this.requiredCriteria) {
            if (req.values) {
                if (!req.values.includes(inputs[req.field])) return false;
            } else {
                if (inputs[req.field] !== req.value) return false;
            }
        }
        
        // Check exclusions
        for (let exc of this.exclusionCriteria) {
            if (inputs[exc.field] === exc.value) return false;
        }
        
        // Calculate optional score
        let score = 0;
        for (let opt of this.optionalCriteria) {
            if (inputs[opt.field] === opt.value) {
                score += opt.weight;
            }
        }
        
        return score >= this.minimumScore;
    }
};

// APPROACH 2: CLINICAL DECISION TREES
const smartRule2 = {
    id: 'TRAUMA_DECISION_TREE',
    name: 'Trauma Assessment (Decision Tree)',
    
    condition: function(inputs) {
        // Decision tree logic
        if (inputs.recent_trauma !== true) return false;
        
        // Branch 1: Severe neurological signs
        if (inputs.seizures === 'severe') {
            return { match: true, subtype: 'TRAUMATIC_BRAIN_INJURY', confidence: 0.95 };
        }
        
        // Branch 2: Paralysis
        if (inputs.mobility_status === 'paralyzed') {
            return { match: true, subtype: 'SPINAL_FRACTURE', confidence: 0.90 };
        }
        
        // Branch 3: General trauma
        return { match: true, subtype: 'GENERAL_TRAUMA', confidence: 0.70 };
    }
};

// APPROACH 3: FUZZY LOGIC SCORING
const smartRule3 = {
    id: 'VESTIBULAR_FUZZY',
    name: 'Vestibular Syndrome (Fuzzy Logic)',
    
    // Define fuzzy membership functions
    fuzzyScores: {
        vestibular_signs: function(inputs) {
            let score = 0;
            if (inputs.head_tilt) score += 0.8;
            if (inputs.eye_signs) score += 0.7;
            if (inputs.mobility_status === 'wobbly') score += 0.6;
            return Math.min(1.0, score); // Cap at 1.0
        },
        
        age_appropriateness: function(inputs) {
            // Vestibular more common in seniors
            if (inputs.age_group === 'senior') return 0.8;
            if (inputs.age_group === 'adult') return 0.6;
            return 0.3; // Less common in kittens
        },
        
        onset_pattern: function(inputs) {
            // Sudden onset more typical
            if (inputs.onset_speed === 'sudden') return 0.9;
            return 0.4;
        }
    },
    
    condition: function(inputs) {
        const vestibularScore = this.fuzzyScores.vestibular_signs(inputs);
        const ageScore = this.fuzzyScores.age_appropriateness(inputs);
        const onsetScore = this.fuzzyScores.onset_pattern(inputs);
        
        // Combined fuzzy score (weighted average)
        const totalScore = (vestibularScore * 0.6) + (ageScore * 0.2) + (onsetScore * 0.2);
        
        return totalScore >= 0.6; // Threshold for match
    }
};

// APPROACH 4: SYNDROME PATTERN MATCHING
const smartRule4 = {
    id: 'SYNDROME_PATTERNS',
    name: 'Syndrome Pattern Recognition',
    
    // Define known clinical syndromes
    syndromes: {
        CLASSIC_ATE: {
            pattern: ['mobility_abnormal', 'pain_present', 'cold_limbs'],
            weight: 0.95,
            description: 'Classic aortic thromboembolism triad'
        },
        
        TOXICITY_TRIAD: {
            pattern: ['sudden_onset', 'severe_seizures', 'eye_signs'],
            weight: 0.90,
            description: 'Acute neurotoxicity pattern'
        },
        
        SENIOR_GRADUAL: {
            pattern: ['senior_age', 'gradual_onset', 'no_trauma'],
            weight: 0.70,
            description: 'Degenerative/neoplastic pattern'
        }
    },
    
    condition: function(inputs) {
        // Convert inputs to pattern format
        const inputPattern = this.convertToPattern(inputs);
        
        // Check each syndrome
        for (let [name, syndrome] of Object.entries(this.syndromes)) {
            const match = this.patternMatch(inputPattern, syndrome.pattern);
            if (match >= syndrome.weight) {
                return { match: true, syndrome: name, confidence: match };
            }
        }
        
        return false;
    },
    
    convertToPattern: function(inputs) {
        return [
            inputs.mobility_status !== 'normal' ? 'mobility_abnormal' : 'mobility_normal',
            inputs.pain_signs ? 'pain_present' : 'pain_absent',
            inputs.cold_limbs ? 'cold_limbs' : 'warm_limbs',
            inputs.onset_speed === 'sudden' ? 'sudden_onset' : 'gradual_onset',
            inputs.seizures === 'severe' ? 'severe_seizures' : 'mild_or_no_seizures',
            inputs.eye_signs ? 'eye_signs' : 'no_eye_signs',
            inputs.age_group === 'senior' ? 'senior_age' : 'younger_age',
            inputs.recent_trauma ? 'trauma_present' : 'no_trauma'
        ];
    },
    
    patternMatch: function(inputPattern, syndromePattern) {
        const matches = syndromePattern.filter(item => inputPattern.includes(item));
        return matches.length / syndromePattern.length;
    }
};

// APPROACH 5: BAYESIAN PROBABILITY
const smartRule5 = {
    id: 'BAYESIAN_DIAGNOSIS',
    name: 'Bayesian Probability Diagnosis',
    
    // Prior probabilities (base rates)
    priors: {
        'HYPOGLYCEMIA': 0.15, // 15% of kitten neuro cases
        'EPILEPSY': 0.25,     // 25% of adult seizure cases
        'TUMOR': 0.30         // 30% of senior gradual cases
    },
    
    // Likelihood of symptoms given diagnosis
    likelihoods: {
        'HYPOGLYCEMIA': {
            'kitten': 0.90,
            'sudden_onset': 0.85,
            'seizures': 0.80
        },
        'EPILEPSY': {
            'adult': 0.70,
            'seizures': 0.95,
            'normal_mobility': 0.80
        }
    },
    
    condition: function(inputs) {
        // Calculate posterior probabilities using Bayes' theorem
        const posteriors = {};
        
        for (let diagnosis of Object.keys(this.priors)) {
            let likelihood = 1.0;
            
            // Multiply likelihoods for observed symptoms
            for (let [symptom, prob] of Object.entries(this.likelihoods[diagnosis] || {})) {
                if (this.symptomPresent(inputs, symptom)) {
                    likelihood *= prob;
                } else {
                    likelihood *= (1 - prob); // Symptom absent
                }
            }
            
            posteriors[diagnosis] = this.priors[diagnosis] * likelihood;
        }
        
        // Normalize probabilities
        const total = Object.values(posteriors).reduce((sum, p) => sum + p, 0);
        for (let diagnosis of Object.keys(posteriors)) {
            posteriors[diagnosis] /= total;
        }
        
        // Return diagnosis with highest probability if above threshold
        const best = Object.entries(posteriors).reduce((a, b) => a[1] > b[1] ? a : b);
        return best[1] > 0.6 ? { match: true, diagnosis: best[0], probability: best[1] } : false;
    },
    
    symptomPresent: function(inputs, symptom) {
        const mapping = {
            'kitten': inputs.age_group === 'kitten',
            'adult': inputs.age_group === 'adult',
            'sudden_onset': inputs.onset_speed === 'sudden',
            'seizures': inputs.seizures !== 'none',
            'normal_mobility': inputs.mobility_status === 'normal'
        };
        return mapping[symptom] || false;
    }
};

console.log('🧠 Smart Rule Approaches Loaded');
console.log('✅ No combinatorial explosion - just intelligent pattern matching!');