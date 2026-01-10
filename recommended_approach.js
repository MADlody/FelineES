/**
 * RECOMMENDED APPROACH: HYBRID SMART RULES
 * 
 * Combines the best of multiple approaches without combinatorial explosion
 */

// SMART RULE TEMPLATE
class SmartDiagnosticRule {
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.priority = config.priority;
        this.description = config.description;
        
        // Core criteria (must have)
        this.coreCriteria = config.coreCriteria || [];
        
        // Supporting criteria (add confidence)
        this.supportingCriteria = config.supportingCriteria || [];
        
        // Exclusion criteria (rule out)
        this.exclusionCriteria = config.exclusionCriteria || [];
        
        // Minimum confidence threshold
        this.minConfidence = config.minConfidence || 0.6;
        
        // Clinical metadata
        this.urgency = config.urgency;
        this.clinicalNotes = config.clinicalNotes;
        this.nextSteps = config.nextSteps;
    }
    
    evaluate(inputs) {
        // 1. Check exclusions first
        for (let exclusion of this.exclusionCriteria) {
            if (this.checkCriterion(inputs, exclusion)) {
                return { match: false, reason: 'Excluded by: ' + exclusion.description };
            }
        }
        
        // 2. Check core criteria
        let coreScore = 0;
        let coreMax = this.coreCriteria.length;
        
        for (let core of this.coreCriteria) {
            if (this.checkCriterion(inputs, core)) {
                coreScore += 1;
            }
        }
        
        // Must have ALL core criteria
        if (coreScore < coreMax) {
            return { match: false, reason: `Missing core criteria: ${coreScore}/${coreMax}` };
        }
        
        // 3. Calculate supporting evidence
        let supportScore = 0;
        let supportMax = this.supportingCriteria.reduce((sum, s) => sum + s.weight, 0);
        
        for (let support of this.supportingCriteria) {
            if (this.checkCriterion(inputs, support)) {
                supportScore += support.weight;
            }
        }
        
        // 4. Calculate final confidence
        const confidence = supportMax > 0 ? supportScore / supportMax : 1.0;
        
        if (confidence >= this.minConfidence) {
            return {
                match: true,
                confidence: confidence,
                coreScore: coreScore,
                supportScore: supportScore,
                breakdown: this.getScoreBreakdown(inputs)
            };
        }
        
        return { match: false, reason: `Low confidence: ${confidence.toFixed(2)} < ${this.minConfidence}` };
    }
    
    checkCriterion(inputs, criterion) {
        const value = inputs[criterion.field];
        
        if (criterion.values) {
            return criterion.values.includes(value);
        } else if (criterion.value !== undefined) {
            return value === criterion.value;
        } else if (criterion.condition) {
            return criterion.condition(inputs);
        }
        
        return false;
    }
    
    getScoreBreakdown(inputs) {
        const breakdown = [];
        
        // Core criteria breakdown
        for (let core of this.coreCriteria) {
            const match = this.checkCriterion(inputs, core);
            breakdown.push({
                type: 'core',
                description: core.description,
                match: match,
                weight: 1
            });
        }
        
        // Supporting criteria breakdown
        for (let support of this.supportingCriteria) {
            const match = this.checkCriterion(inputs, support);
            breakdown.push({
                type: 'supporting',
                description: support.description,
                match: match,
                weight: support.weight
            });
        }
        
        return breakdown;
    }
}

// EXAMPLE: SMART THIAMINE DEFICIENCY RULE
const smartThiamineRule = new SmartDiagnosticRule({
    id: 'THIAMINE_DEFICIENCY_SMART',
    name: 'Thiamine Deficiency (Smart Rule)',
    priority: 7,
    description: 'Nutritional deficiency with characteristic signs',
    
    // CORE: Must have the pathognomonic sign
    coreCriteria: [
        {
            field: 'neck_flexion',
            value: true,
            description: 'Neck ventroflexion (pathognomonic)'
        }
    ],
    
    // SUPPORTING: Additional evidence increases confidence
    supportingCriteria: [
        {
            field: 'mobility_status',
            values: ['wobbly', 'paralyzed'],
            weight: 0.3,
            description: 'Mobility impairment'
        },
        {
            field: 'seizures',
            values: ['mild', 'severe'],
            weight: 0.2,
            description: 'Seizure activity'
        },
        {
            field: 'onset_speed',
            value: 'gradual',
            weight: 0.2,
            description: 'Gradual onset pattern'
        },
        {
            field: 'age_group',
            values: ['kitten', 'adult'],
            weight: 0.1,
            description: 'Age group susceptibility'
        }
    ],
    
    // EXCLUSIONS: Rule out if these are present
    exclusionCriteria: [
        {
            field: 'recent_trauma',
            value: true,
            description: 'Recent trauma (suggests other cause)'
        }
    ],
    
    minConfidence: 0.4, // Lower threshold since neck flexion is pathognomonic
    urgency: 'MODERATE'
});

// EXAMPLE: SMART TRAUMA RULE (COMPLEX)
const smartTraumaRule = new SmartDiagnosticRule({
    id: 'TRAUMATIC_BRAIN_INJURY_SMART',
    name: 'Traumatic Brain Injury (Smart Rule)',
    priority: 1,
    description: 'Critical brain trauma with neurological signs',
    
    // CORE: Must have trauma AND severe neurological signs
    coreCriteria: [
        {
            field: 'recent_trauma',
            value: true,
            description: 'Recent trauma history'
        },
        {
            field: 'seizures',
            value: 'severe',
            description: 'Severe seizure activity'
        }
    ],
    
    // SUPPORTING: Additional signs increase confidence
    supportingCriteria: [
        {
            field: 'mobility_status',
            values: ['wobbly', 'paralyzed'],
            weight: 0.4,
            description: 'Motor dysfunction'
        },
        {
            field: 'eye_signs',
            value: true,
            weight: 0.3,
            description: 'Neurological eye signs'
        },
        {
            field: 'onset_speed',
            value: 'sudden',
            weight: 0.2,
            description: 'Acute onset'
        },
        {
            field: 'pain_signs',
            value: true,
            weight: 0.1,
            description: 'Pain response'
        }
    ],
    
    exclusionCriteria: [], // No exclusions for trauma
    
    minConfidence: 0.6, // Higher threshold for serious diagnosis
    urgency: 'EMERGENCY'
});

// USAGE EXAMPLE
function testSmartRules() {
    const testCase = {
        age_group: 'adult',
        onset_speed: 'gradual',
        mobility_status: 'wobbly',
        seizures: 'mild',
        eye_signs: false,
        pain_signs: false,
        head_tilt: false,
        recent_trauma: false,
        cold_limbs: false,
        neck_flexion: true,  // Pathognomonic sign
        ear_issues: false
    };
    
    console.log('🧪 Testing Smart Thiamine Rule...');
    const result = smartThiamineRule.evaluate(testCase);
    console.log('Result:', result);
    
    // This will now show:
    // - Core criteria: ✓ Neck flexion present
    // - Supporting evidence: Wobbly mobility (+0.3), Mild seizures (+0.2), Gradual onset (+0.2)
    // - Final confidence: 0.7 (above 0.4 threshold)
    // - Match: TRUE with detailed breakdown
}

console.log('🎯 Smart Rule System Ready - No Combinatorial Explosion!');
console.log('✅ Uses medical logic, not brute force combinations');