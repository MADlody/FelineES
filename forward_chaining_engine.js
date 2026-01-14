/**
 * 
 *  - meor
 *      iono how to explain this but this is the way it is
 *      18/12/25 - forward chaining not working dia tembak multiple rules still
 *      
 * 
 *      consultation - legit just find a way to just tembak 1 RULE ONLY
 *      add more rules (from 12 to 30)
 *      better than before but every input must be specific cuh 
 *      
 * 
 *      crashing out
 * 
 *      
 */

class FelineNeuroForwardChainingEngine {
    constructor(data) {
        this.data = data;
        this.lastDiagnosis = null;
        this.database = null;
        
        // Initialize database
        this.initDatabase();
        
        // Convert priority rules to forward chaining rules
        this.forwardChainingRules = this.convertToForwardChainingRules(data.diagnosticRules);
        
        console.log('🧠 Feline Neuro Forward Chaining Engine initialized');
        console.log(`📋 Loaded ${this.forwardChainingRules.length} forward chaining rules`);
    }

    /**
     * Initialize database connection
     */
    async initDatabase() {
        try {
            if (typeof FelineNeuroDiagnosisDB !== 'undefined') {
                this.database = new FelineNeuroDiagnosisDB();
                await this.database.init();
                console.log('💾 Database integration enabled');
            }
        } catch (error) {
            console.warn('⚠️ Database initialization failed, continuing without database:', error);
        }
    }

    convertToForwardChainingRules(priorityRules) {
        const forwardRules = [];

        // Create intermediate inference rules
        forwardRules.push(
            // Trauma detection rules
            {
                id: 'DETECT_TRAUMA_SIGNS',
                name: 'Detect Trauma Signs',
                conditions: ['recent_trauma'],
                conclusions: ['has_trauma_history'],
                confidence: 0.9
            },
            
            // Neurological severity rules
            {
                id: 'DETECT_SEVERE_NEURO',
                name: 'Detect Severe Neurological Signs',
                conditions: ['seizures_severe'],
                conclusions: ['severe_neurological_dysfunction'],
                confidence: 0.95
            },
            
            {
                id: 'DETECT_MILD_NEURO',
                name: 'Detect Mild Neurological Signs',
                conditions: ['seizures_mild'],
                conclusions: ['mild_neurological_dysfunction'],
                confidence: 0.8
            },
            
            // Mobility assessment rules
            {
                id: 'DETECT_PARALYSIS',
                name: 'Detect Paralysis',
                conditions: ['mobility_paralyzed'],
                conclusions: ['has_paralysis', 'motor_dysfunction', 'mobility_abnormal'],
                confidence: 0.95
            },
            
            {
                id: 'DETECT_ATAXIA',
                name: 'Detect Ataxia',
                conditions: ['mobility_wobbly'],
                conclusions: ['has_ataxia', 'coordination_problems', 'mobility_abnormal'],
                confidence: 0.9
            },
            
            // Pain and discomfort rules
            {
                id: 'DETECT_PAIN',
                name: 'Detect Pain Signs',
                conditions: ['pain_signs'],
                conclusions: ['experiencing_pain'],
                confidence: 0.85
            },
            
            // Vascular compromise rules
            {
                id: 'DETECT_VASCULAR_COMPROMISE',
                name: 'Detect Vascular Compromise',
                conditions: ['cold_limbs', 'has_paralysis'],
                conclusions: ['vascular_compromise', 'circulation_problems'],
                confidence: 0.9
            },
            
            // Metabolic signs
            {
                id: 'DETECT_METABOLIC_SIGNS',
                name: 'Detect Metabolic Signs',
                conditions: ['neck_flexion'],
                conclusions: ['metabolic_dysfunction', 'thiamine_deficiency_signs'],
                confidence: 0.95
            },
            
            // Age-related factors
            {
                id: 'SENIOR_RISK_FACTORS',
                name: 'Senior Risk Factors',
                conditions: ['age_senior'],
                conclusions: ['increased_tumor_risk', 'degenerative_risk'],
                confidence: 0.7
            },
            
            {
                id: 'KITTEN_RISK_FACTORS',
                name: 'Kitten Risk Factors',
                conditions: ['age_kitten'],
                conclusions: ['metabolic_vulnerability', 'developmental_risk', 'age_young_or_adult'],
                confidence: 0.8
            },
            
            {
                id: 'ADULT_RISK_FACTORS',
                name: 'Adult Risk Factors',
                conditions: ['age_adult'],
                conclusions: ['age_young_or_adult'],
                confidence: 0.8
            },
            
            // Onset pattern rules
            {
                id: 'ACUTE_ONSET_PATTERN',
                name: 'Acute Onset Pattern',
                conditions: ['onset_sudden'],
                conclusions: ['acute_condition'],
                confidence: 0.8
            },
            
            {
                id: 'CHRONIC_ONSET_PATTERN',
                name: 'Chronic Onset Pattern',
                conditions: ['onset_gradual'],
                conclusions: ['chronic_condition'],
                confidence: 0.8
            }
        );

        // Convert original diagnostic rules to forward chaining format
        priorityRules.forEach(rule => {
            const forwardRule = {
                id: rule.id,
                name: rule.name,
                conditions: this.extractConditionsFromRule(rule),
                conclusions: [`diagnosis_${rule.id.toLowerCase()}`],
                confidence: this.calculateRuleConfidence(rule),
                originalRule: rule,
                isDiagnosticRule: true
            };
            forwardRules.push(forwardRule);
        });

        return forwardRules;
    }

    extractConditionsFromRule(rule) {
        const conditions = [];
        const conditionStr = rule.condition.toString();
        
        if (conditionStr.includes('recent_trauma === true')) conditions.push('recent_trauma');
        if (conditionStr.includes('seizures === \'severe\'')) conditions.push('seizures_severe');
        if (conditionStr.includes('seizures === \'mild\'')) conditions.push('seizures_mild');
        if (conditionStr.includes('mobility_status === \'paralyzed\'')) conditions.push('mobility_paralyzed');
        if (conditionStr.includes('mobility_status === \'wobbly\'')) conditions.push('mobility_wobbly');
        
        if (conditionStr.includes('mobility_status !== \'normal\'')) {
            conditions.push('mobility_abnormal');
        }
        
        if (conditionStr.includes('pain_signs === true')) conditions.push('pain_signs');
        if (conditionStr.includes('cold_limbs === true')) conditions.push('cold_limbs');
        if (conditionStr.includes('neck_flexion === true')) conditions.push('neck_flexion');
        if (conditionStr.includes('eye_signs === true')) conditions.push('eye_signs');
        if (conditionStr.includes('head_tilt === true')) conditions.push('head_tilt');
        if (conditionStr.includes('ear_issues === true')) conditions.push('ear_issues');
        
        const hasKittenOrAdult = conditionStr.includes('age_group === \'kitten\'') && 
                                 conditionStr.includes('age_group === \'adult\'') &&
                                 conditionStr.includes('||');
        
        if (hasKittenOrAdult) {
            conditions.push('age_young_or_adult');
        } else {
            if (conditionStr.includes('age_group === \'senior\'')) conditions.push('age_senior');
            if (conditionStr.includes('age_group === \'kitten\'')) conditions.push('age_kitten');
            if (conditionStr.includes('age_group === \'adult\'')) conditions.push('age_adult');
        }
        
        if (conditionStr.includes('onset_speed === \'sudden\'')) conditions.push('onset_sudden');
        if (conditionStr.includes('onset_speed === \'gradual\'')) conditions.push('onset_gradual');
        
        return conditions;
    }

    calculateRuleConfidence(rule) {
        if (rule.priority <= 5) return 0.95 - (rule.priority - 1) * 0.01;
        if (rule.priority <= 15) return 0.9 - (rule.priority - 6) * 0.01;
        if (rule.priority <= 25) return 0.8 - (rule.priority - 16) * 0.01;
        return 0.7 - (rule.priority - 26) * 0.02;
    }

    runDiagnosis(inputs, options = {}) {
        console.log('🔄 Starting Forward Chaining Diagnosis...');
        console.log('📊 Input data:', inputs);
        
        const initialFacts = this.convertInputsToFacts(inputs);
        console.log('📋 Initial facts:', initialFacts);
        
        const inferenceResult = this.forwardChaining(initialFacts);
        console.log('🧠 Inference complete. Derived facts:', inferenceResult.derivedFacts);
        console.log('🔍 Applied rules:', inferenceResult.appliedRules.map(r => r.name));
        
        const diagnosis = this.selectBestDiagnosis(inferenceResult, inputs);
        console.log('✅ Selected diagnosis:', diagnosis.diagnosis);
        
        this.storeDiagnosisInDatabase(diagnosis, inputs);
        this.lastDiagnosis = diagnosis;
        
        return diagnosis;
    }

    convertInputsToFacts(inputs) {
        const facts = new Set();
        
        if (inputs.recent_trauma === true) facts.add('recent_trauma');
        if (inputs.pain_signs === true) facts.add('pain_signs');
        if (inputs.head_tilt === true) facts.add('head_tilt');
        if (inputs.cold_limbs === true) facts.add('cold_limbs');
        if (inputs.neck_flexion === true) facts.add('neck_flexion');
        if (inputs.ear_issues === true) facts.add('ear_issues');
        if (inputs.eye_signs === true) facts.add('eye_signs');
        
        if (inputs.age_group === 'senior') facts.add('age_senior');
        if (inputs.age_group === 'kitten') facts.add('age_kitten');
        if (inputs.age_group === 'adult') facts.add('age_adult');
        
        if (inputs.onset_speed === 'sudden') facts.add('onset_sudden');
        if (inputs.onset_speed === 'gradual') facts.add('onset_gradual');
        
        if (inputs.mobility_status === 'paralyzed') facts.add('mobility_paralyzed');
        if (inputs.mobility_status === 'wobbly') facts.add('mobility_wobbly');
        if (inputs.mobility_status === 'normal') facts.add('mobility_normal');
        
        if (inputs.seizures === 'severe') facts.add('seizures_severe');
        if (inputs.seizures === 'mild') facts.add('seizures_mild');
        if (inputs.seizures === 'none') facts.add('seizures_none');
        
        return facts;
    }

    /**
     * Forward chaining inference engine
     */
    forwardChaining(initialFacts) {
        const workingMemory = new Set(initialFacts);
        const appliedRules = [];
        let changed = true;
        let iteration = 0;
        
        console.log('🔄 Starting forward chaining inference...');
        console.log('📋 Initial facts:', Array.from(initialFacts));
        
        while (changed && iteration < 10) {
            changed = false;
            iteration++;
            
            console.log(`\n--- Iteration ${iteration} ---`);
            console.log('Current facts:', Array.from(workingMemory));
            
            for (const rule of this.forwardChainingRules) {
                if (this.ruleConditionsSatisfied(rule, workingMemory)) {
                    if (!appliedRules.find(r => r.id === rule.id)) {
                        console.log(`✅ Applying rule: ${rule.name}`);
                        
                        let newFactsAdded = false;
                        for (const conclusion of rule.conclusions) {
                            if (!workingMemory.has(conclusion)) {
                                workingMemory.add(conclusion);
                                newFactsAdded = true;
                                console.log(`  → New fact: ${conclusion}`);
                            }
                        }
                        
                        appliedRules.push({
                            ...rule,
                            appliedInIteration: iteration
                        });
                        
                        if (newFactsAdded) {
                            changed = true;
                        }
                    }
                }
            }
        }
        
        console.log(`\n🏁 Forward chaining complete after ${iteration} iterations`);
        console.log('Final facts:', Array.from(workingMemory));
        
        return {
            derivedFacts: workingMemory,
            appliedRules: appliedRules,
            iterations: iteration
        };
    }

    ruleConditionsSatisfied(rule, workingMemory) {
        return rule.conditions.every(condition => workingMemory.has(condition));
    }

    selectBestDiagnosis(inferenceResult, originalInputs) {
        const { derivedFacts, appliedRules } = inferenceResult;
        
        const diagnosticFacts = Array.from(derivedFacts).filter(fact => 
            fact.startsWith('diagnosis_')
        );
        
        console.log('🎯 Diagnostic facts found:', diagnosticFacts);
        
        if (diagnosticFacts.length === 0) {
            return this.createUndeterminedDiagnosis(inferenceResult, originalInputs);
        }
        
        let bestDiagnosis = null;
        let highestConfidence = 0;
        
        for (const diagnosticFact of diagnosticFacts) {
            const ruleId = diagnosticFact.replace('diagnosis_', '').toUpperCase();
            const appliedRule = appliedRules.find(r => r.id === ruleId);
            
            if (appliedRule && appliedRule.confidence > highestConfidence) {
                highestConfidence = appliedRule.confidence;
                bestDiagnosis = appliedRule;
            }
        }
        
        if (bestDiagnosis && bestDiagnosis.originalRule) {
            return this.createDiagnosisResult(bestDiagnosis.originalRule, inferenceResult, originalInputs);
        }
        
        return this.createUndeterminedDiagnosis(inferenceResult, originalInputs);
    }

    createDiagnosisResult(rule, inferenceResult, originalInputs) {
        return {
            diagnosis: rule.name,
            priority: rule.priority,
            urgency: rule.urgency,
            description: rule.description,
            clinicalNotes: rule.clinicalNotes || [],
            nextSteps: rule.nextSteps || [],
            inferenceMethod: 'Forward Chaining',
            derivedFacts: Array.from(inferenceResult.derivedFacts),
            appliedRules: inferenceResult.appliedRules.map(r => r.name),
            iterations: inferenceResult.iterations,
            logicExplanation: this.generateForwardChainingExplanation(rule, inferenceResult, originalInputs),
            ruleId: rule.id,
            confidence: this.calculateRuleConfidence(rule),
            timestamp: new Date().toISOString()
        };
    }

    createUndeterminedDiagnosis(inferenceResult, originalInputs) {
        return {
            diagnosis: 'Undetermined Neurological Condition',
            priority: 29,
            urgency: 'MODERATE',
            description: 'The forward chaining inference could not determine a specific diagnosis based on the provided symptoms.',
            clinicalNotes: [
                'Multiple neurological signs present but no specific pattern identified',
                'Further diagnostic testing recommended',
                'Consider consultation with veterinary neurologist'
            ],
            nextSteps: [
                'Comprehensive neurological examination',
                'Advanced diagnostic imaging (MRI/CT)',
                'Laboratory workup including blood chemistry',
                'Specialist consultation recommended'
            ],
            inferenceMethod: 'Forward Chaining',
            derivedFacts: Array.from(inferenceResult.derivedFacts),
            appliedRules: inferenceResult.appliedRules.map(r => r.name),
            iterations: inferenceResult.iterations,
            logicExplanation: this.generateUndeterminedExplanation(inferenceResult, originalInputs),
            ruleId: 'UNDETERMINED',
            confidence: 0.6,
            timestamp: new Date().toISOString()
        };
    }

    generateForwardChainingExplanation(rule, inferenceResult, originalInputs) {
        let explanation = `Forward Chaining Inference Result:\n\n`;
        explanation += `🎯 DIAGNOSIS: ${rule.name}\n`;
        explanation += `📊 Priority Level: ${rule.priority}\n`;
        explanation += `🔄 Inference Method: Forward Chaining\n`;
        explanation += `🔍 Iterations Required: ${inferenceResult.iterations}\n\n`;
        explanation += `📋 Inference Process:\n`;
        explanation += `1. Started with ${Array.from(this.convertInputsToFacts(originalInputs)).length} initial facts from user input\n`;
        explanation += `2. Applied ${inferenceResult.appliedRules.length} inference rules\n`;
        explanation += `3. Derived ${inferenceResult.derivedFacts.size} total facts\n`;
        explanation += `4. Selected highest confidence diagnosis\n\n`;
        explanation += `🧠 Applied Rules:\n`;
        inferenceResult.appliedRules.forEach((rule, index) => {
            explanation += `  ${index + 1}. ${rule.name} (Iteration ${rule.appliedInIteration})\n`;
        });
        explanation += `\n🎯 Why this diagnosis was selected:\n`;
        explanation += `• Forward chaining derived the fact: diagnosis_${rule.id.toLowerCase()}\n`;
        explanation += `• This diagnosis has confidence level: ${this.calculateRuleConfidence(rule)}\n`;
        explanation += `• Rule conditions were satisfied through inference chain\n`;
        return explanation;
    }

    generateUndeterminedExplanation(inferenceResult, originalInputs) {
        let explanation = `Forward Chaining Inference Result:\n\n`;
        explanation += `🎯 RESULT: No Specific Diagnosis Determined\n`;
        explanation += `🔄 Inference Method: Forward Chaining\n`;
        explanation += `🔍 Iterations Required: ${inferenceResult.iterations}\n\n`;
        explanation += `📋 Inference Process:\n`;
        explanation += `1. Started with ${Array.from(this.convertInputsToFacts(originalInputs)).length} initial facts\n`;
        explanation += `2. Applied ${inferenceResult.appliedRules.length} inference rules\n`;
        explanation += `3. Derived ${inferenceResult.derivedFacts.size} total facts\n`;
        explanation += `4. No specific diagnostic conclusion reached\n\n`;
        explanation += `🧠 Facts Derived:\n`;
        Array.from(inferenceResult.derivedFacts).forEach(fact => {
            if (!fact.startsWith('diagnosis_')) {
                explanation += `  • ${fact}\n`;
            }
        });
        explanation += `\n💡 Recommendation: Further evaluation needed for definitive diagnosis\n`;
        return explanation;
    }

    /**
     * Store diagnosis in database
     */
    async storeDiagnosisInDatabase(diagnosis, inputs) {
        if (this.database) {
            try {
                await this.database.storeDiagnosis(diagnosis, inputs);
                console.log('💾 Diagnosis stored in database');
            } catch (error) {
                console.error('❌ Failed to store diagnosis in database:', error);
            }
        }
    }

    /**
     * Get diagnosis history from database
     */
    async getDiagnosisHistory(limit = 50) {
        if (this.database) {
            try {
                return await this.database.getDiagnosisHistory(limit);
            } catch (error) {
                console.error('❌ Failed to get diagnosis history:', error);
                return [];
            }
        }
        return [];
    }

    /**
     * Get analytics from database
     */
    async getDatabaseAnalytics() {
        if (this.database) {
            try {
                return await this.database.getAnalytics();
            } catch (error) {
                console.error('❌ Failed to get analytics:', error);
                return null;
            }
        }
        return null;
    }
}

// Export for use in other files
window.FelineNeuroForwardChainingEngine = FelineNeuroForwardChainingEngine;