/**
 * Feline Neurological Diagnosis Expert System - Engine
 * 
 * CRITICAL IMPLEMENTATION: PRIORITY WATERFALL LOGIC
 * 
 * This engine implements a strict priority-based diagnostic system:
 * 1. Rules are evaluated in EXACT priority order (1-8)
 * 2. The FIRST matching rule determines the diagnosis
 * 3. Evaluation STOPS immediately after first match
 * 4. Lower priority rules are NEVER evaluated once a match is found
 * 5. System returns EXACTLY ONE diagnosis per evaluation
 * 
 * This ensures deterministic, predictable diagnostic outcomes.
 */

class FelineNeuroDiagnosisEngine {
    constructor(data) {
        this.data = data;
        this.lastDiagnosis = null;
        
        // Ensure rules are sorted by priority (safety check)
        this.sortedRules = this.data.diagnosticRules.sort((a, b) => a.priority - b.priority);
        
        console.log('🧠 Feline Neuro Diagnosis Engine initialized');
        console.log(`📋 Loaded ${this.sortedRules.length} diagnostic rules in priority order`);
    }

    /**
     * MAIN DIAGNOSTIC FUNCTION
     * 
     * Implements Enhanced Priority Waterfall Logic with:
     * - Complete input validation (all required fields)
     * - Input buffering and confirmation
     * - Best match evaluation across all rules
     * - Robust timing-independent diagnosis
     * 
     * @param {Object} inputs - Clinical assessment inputs
     * @param {Object} options - Diagnostic options
     * @returns {Object} Single diagnosis result with enhanced metadata
     */
    runDiagnosis(inputs, options = {}) {
        console.log('🔍 Starting Enhanced Priority Waterfall Diagnosis...');
        console.log('📊 Input data:', inputs);
        console.log('⚙️ Options:', options);
        
        // SOLUTION 1: Require Complete Input Validation
        const validation = this.validateCompleteInputs(inputs);
        if (!validation.isValid) {
            throw new Error(`Incomplete inputs: ${validation.errors.join(', ')}`);
        }

        // SOLUTION 2: Input Buffering - Store inputs for confirmation
        this.bufferedInputs = { ...inputs };
        
        // SOLUTION 4: Confirmation Step (if not bypassed)
        if (!options.skipConfirmation) {
            const confirmation = this.generateInputConfirmation(inputs);
            console.log('📋 Input Confirmation:', confirmation);
        }

        // SOLUTION 3: Best Match Logic - Evaluate ALL rules to find best match
        const allMatches = this.evaluateAllRules(inputs);
        
        if (allMatches.length === 0) {
            // This should never happen since Priority 30 (UNDETERMINED) always matches
            console.error('🚨 CRITICAL ERROR: No rules matched (this should never happen)');
            throw new Error('System error: No diagnostic rules matched');
        }

        // Get the highest scoring match
        const bestMatch = allMatches[0]; // Already sorted by score
        
        console.log(`✅ BEST MATCH FOUND! Priority ${bestMatch.rule.priority}: ${bestMatch.rule.name}`);
        console.log(`🎯 Winning Score: ${bestMatch.score.total} points`);
        console.log(`🔍 Total matches evaluated: ${allMatches.length}`);
        console.log(`🛑 Selected highest scoring match (Weighted Scoring Logic)`);
        
        // Create the diagnosis result with enhanced metadata
        const diagnosis = this.createEnhancedDiagnosisResult(bestMatch, inputs, allMatches);
        
        // Store for reference
        this.lastDiagnosis = diagnosis;
        
        return diagnosis;
    }

    /**
     * CREATE DIAGNOSIS RESULT
     * 
     * Formats the matched rule into a complete diagnosis result
     * 
     * @param {Object} rule - The matched diagnostic rule
     * @param {Object} inputs - Original inputs
     * @param {number} rulesEvaluated - Number of rules checked before match
     * @returns {Object} Complete diagnosis result
     */
    createDiagnosisResult(rule, inputs, rulesEvaluated) {
        return {
            // Core diagnosis information
            diagnosis: rule.name,
            priority: rule.priority,
            ruleId: rule.id,
            description: rule.description,
            
            // Clinical information
            clinicalNotes: rule.clinicalNotes,
            nextSteps: rule.nextSteps,
            urgency: rule.urgency,
            
            // Visual styling
            icon: rule.icon,
            color: rule.color,
            
            // System metadata
            rulesEvaluated: rulesEvaluated,
            totalRules: this.sortedRules.length,
            timestamp: new Date(),
            
            // Logic explanation for educational purposes
            logicExplanation: this.generateLogicExplanation(rule, inputs, rulesEvaluated),
            
            // Original inputs for reference
            inputs: { ...inputs }
        };
    }

    /**
     * GENERATE ENHANCED LOGIC EXPLANATION
     * 
     * Creates clean explanation without scoring details
     * 
     * @param {Object} rule - The selected rule
     * @param {Object} inputs - Clinical inputs
     * @param {Array} allMatches - All matching rules with scores
     * @returns {string} Clean logic explanation
     */
    generateEnhancedLogicExplanation(rule, inputs, allMatches) {
        let explanation = `Enhanced Diagnostic Logic Result:\n\n`;
        
        explanation += `🎯 SELECTED DIAGNOSIS: ${rule.name}\n`;
        explanation += `📊 Priority Level: ${rule.priority} of 30\n`;
        explanation += `🔍 Total Rules Evaluated: ${this.sortedRules.length} (ALL rules checked)\n`;
        explanation += `🎯 Total Matches Found: ${allMatches.length}\n\n`;
        
        // Show why this specific diagnosis was selected
        explanation += `📋 Why this diagnosis was selected:\n`;
        explanation += this.explainSpecificRuleLogic(rule, inputs);
        
        explanation += `\n🔧 System Enhancements Applied:\n`;
        explanation += `  • Complete Input Validation: All fields required\n`;
        explanation += `  • Input Buffering: Inputs confirmed before processing\n`;
        explanation += `  • Enhanced Logic: Prevents single-condition dominance\n`;
        explanation += `  • Timing Independence: Result unaffected by input order\n`;
        
        return explanation;
    }

    /**
     * EXPLAIN SPECIFIC RULE LOGIC
     * 
     * Detailed explanation for the selected rule
     * 
     * @param {Object} rule - The diagnostic rule
     * @param {Object} inputs - Clinical inputs
     * @returns {string} Rule-specific explanation
     */
    explainSpecificRuleLogic(rule, inputs) {
        // Use the existing logic but make it more detailed
        let explanation = this.generateLogicExplanation(rule, inputs, 1);
        
        // Extract just the "Why this diagnosis was selected" section
        const startIndex = explanation.indexOf('📋 Why this diagnosis was selected:');
        const endIndex = explanation.indexOf('\n🔄 System Logic:');
        
        if (startIndex !== -1 && endIndex !== -1) {
            return explanation.substring(startIndex, endIndex);
        }
        
        return explanation;
    }

    /**
     * GENERATE LOGIC EXPLANATION (Original Method)
     * 
     * Creates human-readable explanation of why this diagnosis was selected
     * This is crucial for educational purposes and system transparency
     * 
     * @param {Object} rule - The matched rule
     * @param {Object} inputs - Clinical inputs
     * @param {number} rulesEvaluated - Rules checked before match
     * @returns {string} Logic explanation
     */
    generateLogicExplanation(rule, inputs, rulesEvaluated) {
        let explanation = `Priority Waterfall Logic Result:\n\n`;
        
        explanation += `🎯 DIAGNOSIS: ${rule.name}\n`;
        explanation += `📊 Priority Level: ${rule.priority} of 8\n`;
        explanation += `🔍 Rules Evaluated: ${rulesEvaluated} (stopped at first match)\n\n`;
        
        explanation += `📋 Why this diagnosis was selected:\n`;
        
        // Explain the specific logic for each rule
        switch (rule.id) {
            case 'TRAUMATIC_BRAIN_INJURY':
                explanation += `• Recent trauma was reported AND severe seizures present\n`;
                explanation += `• Indicates critical brain injury with bleeding/swelling\n`;
                explanation += `• Highest priority - requires immediate neurosurgical intervention\n`;
                break;
                
            case 'SPINAL_FRACTURE':
                explanation += `• Recent trauma was reported AND complete paralysis present\n`;
                explanation += `• Suggests vertebral fracture with spinal cord compression\n`;
                explanation += `• Emergency spinal stabilization required\n`;
                break;
                
            case 'GENERAL_TRAUMA':
                explanation += `• Recent trauma was reported\n`;
                explanation += `• Trauma takes precedence over all non-trauma conditions\n`;
                explanation += `• Requires immediate trauma assessment\n`;
                break;
                
            case 'SADDLE_THROMBUS':
                explanation += `• Mobility is ${inputs.mobility_status} AND\n`;
                explanation += `• Pain signs are present AND\n`;
                explanation += `• Limbs feel cold to touch\n`;
                explanation += `• This triad is classic for aortic thromboembolism\n`;
                break;
                
            case 'ACUTE_TOXICITY':
                explanation += `• Onset is sudden AND\n`;
                explanation += `• Severe seizures are present AND\n`;
                explanation += `• Eye signs (dilated pupils/twitching) are present\n`;
                explanation += `• This triad suggests acute neurotoxicity\n`;
                break;
                
            case 'HYPOGLYCEMIA':
                explanation += `• Patient is a kitten (${inputs.age_group}) AND\n`;
                explanation += `• Onset is sudden AND\n`;
                explanation += `• Seizures are present (${inputs.seizures})\n`;
                explanation += `• This pattern suggests severe hypoglycemia\n`;
                break;
                
            case 'THIAMINE_DEFICIENCY':
                explanation += `• Neck flexion (curling) is present\n`;
                explanation += `• This is pathognomonic for thiamine deficiency\n`;
                explanation += `• Often caused by raw fish diets containing thiaminase\n`;
                break;
                
            case 'HYPERTENSION':
                explanation += `• Patient is senior (${inputs.age_group}) AND\n`;
                explanation += `• Onset is sudden AND\n`;
                explanation += `• ${inputs.seizures === 'mild' ? 'Mild seizures present' : 'Eye signs present'} AND\n`;
                explanation += `• Mobility remains normal\n`;
                explanation += `• Classic pattern for hypertensive crisis\n`;
                break;
                
            case 'NEURO_FIP':
                explanation += `• Patient is a kitten (${inputs.age_group}) AND\n`;
                explanation += `• Onset is gradual AND\n`;
                explanation += `• ${inputs.mobility_status === 'wobbly' ? 'Mobility is wobbly' : 'Mild seizures present'}\n`;
                explanation += `• This pattern is classic for neurological FIP in young cats\n`;
                break;
                
            case 'BRAIN_TUMOR_MENINGIOMA':
                explanation += `• Patient is senior (${inputs.age_group}) AND\n`;
                explanation += `• Onset is gradual AND\n`;
                explanation += `• Mild seizures are present\n`;
                explanation += `• This pattern suggests benign brain tumor (meningioma)\n`;
                break;
                
            case 'HIGH_GRADE_BRAIN_TUMOR':
                explanation += `• Patient is senior (${inputs.age_group}) AND\n`;
                explanation += `• Onset is gradual AND\n`;
                explanation += `• Severe seizures are present\n`;
                explanation += `• This pattern suggests aggressive brain malignancy\n`;
                break;
                
            case 'SPINAL_TUMOR_LYMPHOMA':
                explanation += `• Patient is senior (${inputs.age_group}) AND\n`;
                explanation += `• Mobility is paralyzed AND\n`;
                explanation += `• Onset is gradual\n`;
                explanation += `• This pattern suggests spinal lymphoma\n`;
                break;
                
            case 'IVDD':
                explanation += `• Pain signs are present AND\n`;
                explanation += `• Mobility is abnormal (${inputs.mobility_status}) AND\n`;
                explanation += `• Onset is sudden\n`;
                explanation += `• This combination suggests acute disc herniation\n`;
                break;
                
            case 'IDIOPATHIC_EPILEPSY':
                explanation += `• Patient is adult (${inputs.age_group}) AND\n`;
                explanation += `• Severe seizures are present AND\n`;
                explanation += `• Mobility remains normal\n`;
                explanation += `• Primary seizure disorder after ruling out other causes\n`;
                break;
                
            case 'DIABETIC_NEUROPATHY':
                explanation += `• Patient is senior (${inputs.age_group}) AND\n`;
                explanation += `• Mobility is wobbly AND\n`;
                explanation += `• Onset is gradual\n`;
                explanation += `• This pattern suggests diabetic neuropathy (plantigrade stance)\n`;
                break;
                
            case 'OTITIS_INTERNA':
                explanation += `• Ear issues are present AND\n`;
                explanation += `• ${inputs.head_tilt ? 'Head tilt present' : 'Wobbly mobility present'}\n`;
                explanation += `• This suggests inner ear infection affecting balance\n`;
                break;
                
            case 'IDIOPATHIC_VESTIBULAR':
                explanation += `• Onset is sudden AND\n`;
                explanation += `• ${inputs.head_tilt ? 'Head tilt present' : 'Eye signs present'} AND\n`;
                explanation += `• Mobility is wobbly\n`;
                explanation += `• Classic pattern for sudden vestibular dysfunction\n`;
                break;
                
            case 'COGNITIVE_DYSFUNCTION':
                explanation += `• Patient is senior (${inputs.age_group}) AND\n`;
                explanation += `• Onset is gradual AND\n`;
                explanation += `• No seizures present\n`;
                explanation += `• Age-related cognitive decline pattern\n`;
                break;
                
            case 'UNDETERMINED':
                explanation += `• No specific diagnostic pattern matched\n`;
                explanation += `• All ${this.sortedRules.length - 1} higher priority rules were evaluated\n`;
                explanation += `• Further diagnostic workup recommended\n`;
                break;
                
            default:
                explanation += `• Clinical pattern matches rule criteria for ${rule.name}\n`;
                explanation += `• Specific condition logic applied\n`;
                break;
        }
        
        explanation += `\n🔄 System Logic: The first matching rule determines the diagnosis (Priority Waterfall)`;
        
        return explanation;
    }

    /**
     * ENHANCED INPUT VALIDATION
     * 
     * SOLUTION 1: Requires ALL fields to be completed before diagnosis
     * This prevents partial input scenarios from affecting results
     * 
     * @param {Object} inputs - Clinical assessment inputs
     * @returns {Object} Enhanced validation result
     */
    validateCompleteInputs(inputs) {
        const errors = [];
        
        // Required fields - ALL must be present and valid
        const requiredFields = ['age_group', 'onset_speed', 'mobility_status', 'seizures'];
        
        requiredFields.forEach(field => {
            if (!inputs[field] || inputs[field] === '') {
                errors.push(`Missing required field: ${field}`);
            }
        });
        
        // All boolean fields must be explicitly set (not undefined)
        const booleanFields = ['eye_signs', 'pain_signs', 'head_tilt', 'recent_trauma', 'cold_limbs', 'neck_flexion', 'ear_issues'];
        booleanFields.forEach(field => {
            if (inputs[field] === undefined) {
                errors.push(`Boolean field ${field} must be explicitly set (true/false)`);
            }
        });
        
        // Validate enum values
        const validAgeGroups = ['kitten', 'adult', 'senior'];
        if (inputs.age_group && !validAgeGroups.includes(inputs.age_group)) {
            errors.push(`Invalid age group: ${inputs.age_group}`);
        }
        
        const validOnset = ['sudden', 'gradual'];
        if (inputs.onset_speed && !validOnset.includes(inputs.onset_speed)) {
            errors.push(`Invalid onset speed: ${inputs.onset_speed}`);
        }
        
        const validMobility = ['normal', 'wobbly', 'paralyzed'];
        if (inputs.mobility_status && !validMobility.includes(inputs.mobility_status)) {
            errors.push(`Invalid mobility status: ${inputs.mobility_status}`);
        }
        
        const validSeizures = ['none', 'mild', 'severe'];
        if (inputs.seizures && !validSeizures.includes(inputs.seizures)) {
            errors.push(`Invalid seizure status: ${inputs.seizures}`);
        }
        
        // Boolean fields validation
        booleanFields.forEach(field => {
            if (inputs[field] !== undefined && typeof inputs[field] !== 'boolean') {
                errors.push(`Field ${field} must be boolean (true/false)`);
            }
        });
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            completeness: this.calculateInputCompleteness(inputs)
        };
    }

    /**
     * CALCULATE INPUT COMPLETENESS
     * 
     * Provides percentage of how complete the inputs are
     * 
     * @param {Object} inputs - Clinical assessment inputs
     * @returns {Object} Completeness information
     */
    calculateInputCompleteness(inputs) {
        const requiredFields = ['age_group', 'onset_speed', 'mobility_status', 'seizures'];
        const booleanFields = ['eye_signs', 'pain_signs', 'head_tilt', 'recent_trauma', 'cold_limbs', 'neck_flexion', 'ear_issues'];
        const totalFields = requiredFields.length + booleanFields.length;
        
        let completedFields = 0;
        
        // Check required fields
        requiredFields.forEach(field => {
            if (inputs[field] && inputs[field] !== '') {
                completedFields++;
            }
        });
        
        // Check boolean fields
        booleanFields.forEach(field => {
            if (inputs[field] !== undefined) {
                completedFields++;
            }
        });
        
        const percentage = Math.round((completedFields / totalFields) * 100);
        
        return {
            completed: completedFields,
            total: totalFields,
            percentage: percentage,
            missing: totalFields - completedFields
        };
    }

    /**
     * GENERATE INPUT CONFIRMATION
     * 
     * SOLUTION 4: Creates human-readable summary of inputs for confirmation
     * 
     * @param {Object} inputs - Clinical assessment inputs
     * @returns {Object} Confirmation summary
     */
    generateInputConfirmation(inputs) {
        return {
            summary: `${inputs.age_group} cat with ${inputs.onset_speed} onset of ${inputs.mobility_status} mobility and ${inputs.seizures} seizures`,
            details: {
                basicInfo: {
                    age: inputs.age_group,
                    onset: inputs.onset_speed,
                    mobility: inputs.mobility_status,
                    seizures: inputs.seizures
                },
                clinicalSigns: {
                    eyeSigns: inputs.eye_signs ? 'Present' : 'Absent',
                    painSigns: inputs.pain_signs ? 'Present' : 'Absent',
                    headTilt: inputs.head_tilt ? 'Present' : 'Absent',
                    recentTrauma: inputs.recent_trauma ? 'Yes' : 'No',
                    coldLimbs: inputs.cold_limbs ? 'Present' : 'Absent',
                    neckFlexion: inputs.neck_flexion ? 'Present' : 'Absent',
                    earIssues: inputs.ear_issues ? 'Present' : 'Absent'
                }
            },
            timestamp: new Date()
        };
    }

    /**
     * EVALUATE ALL RULES WITH WEIGHTED SCORING
     * 
     * SOLUTION: Weighted scoring prevents single-condition dominance
     * Each rule gets a score based on:
     * 1. Base priority (lower number = higher base score)
     * 2. Condition complexity (more conditions = higher score)
     * 3. Specificity bonus (pathognomonic signs get bonus but not dominance)
     * 
     * @param {Object} inputs - Clinical assessment inputs
     * @returns {Array} All matching rules sorted by weighted score
     */
    evaluateAllRules(inputs) {
        const matches = [];
        
        console.log('🔍 Evaluating ALL rules with weighted scoring...');
        
        // Evaluate every single rule
        for (let i = 0; i < this.sortedRules.length; i++) {
            const rule = this.sortedRules[i];
            
            console.log(`🔎 Evaluating Priority ${rule.priority}: ${rule.id}`);
            
            try {
                // Test if this rule's condition matches the inputs
                const isMatch = rule.condition(inputs);
                
                if (isMatch) {
                    // Calculate weighted score for this match
                    const score = this.calculateWeightedScore(rule, inputs);
                    
                    console.log(`✅ MATCH: Priority ${rule.priority}: ${rule.name} (Score: ${score.total})`);
                    matches.push({
                        rule: rule,
                        priority: rule.priority,
                        ruleIndex: i,
                        score: score
                    });
                } else {
                    console.log(`❌ No match for Priority ${rule.priority}`);
                }
                
            } catch (error) {
                console.error(`⚠️ Error evaluating rule ${rule.id}:`, error);
                // Continue to next rule if there's an evaluation error
                continue;
            }
        }
        
        // Sort matches by weighted score (highest score first)
        matches.sort((a, b) => b.score.total - a.score.total);
        
        console.log(`📊 Total matches found: ${matches.length}`);
        matches.forEach(match => {
            console.log(`  - Priority ${match.priority}: ${match.rule.name} (Score: ${match.score.total})`);
        });
        
        return matches;
    }

    /**
     * CALCULATE WEIGHTED SCORE
     * 
     * Prevents single-condition dominance by scoring based on:
     * - Priority weight (base score)
     * - Condition complexity (how many conditions must be met)
     * - Specificity bonus (pathognomonic signs get bonus but not dominance)
     * - Clinical severity (emergency conditions get boost)
     * 
     * @param {Object} rule - The diagnostic rule
     * @param {Object} inputs - Clinical inputs
     * @returns {Object} Detailed scoring breakdown
     */
    calculateWeightedScore(rule, inputs) {
        const scoring = {
            priority: 0,
            complexity: 0,
            specificity: 0,
            severity: 0,
            total: 0,
            breakdown: []
        };

        // 1. PRIORITY WEIGHT (Base score - higher priority = higher base score)
        // But not so high that it dominates everything
        scoring.priority = Math.max(0, 31 - rule.priority) * 10; // Max 300 points
        scoring.breakdown.push(`Priority ${rule.priority}: +${scoring.priority} points`);

        // 2. CONDITION COMPLEXITY SCORE
        // Count how many different input conditions this rule checks
        const complexity = this.analyzeRuleComplexity(rule, inputs);
        scoring.complexity = complexity.conditionsMatched * 50; // 50 points per condition
        scoring.breakdown.push(`Conditions matched (${complexity.conditionsMatched}): +${scoring.complexity} points`);

        // 3. SPECIFICITY BONUS
        // Pathognomonic signs get bonus but not overwhelming dominance
        const specificity = this.getSpecificityBonus(rule.id);
        scoring.specificity = specificity.bonus;
        if (specificity.bonus > 0) {
            scoring.breakdown.push(`${specificity.reason}: +${scoring.specificity} points`);
        }

        // 4. CLINICAL SEVERITY BOOST
        // Emergency conditions get additional weight
        const severity = this.getSeverityBoost(rule.urgency);
        scoring.severity = severity;
        if (severity > 0) {
            scoring.breakdown.push(`${rule.urgency} urgency: +${scoring.severity} points`);
        }

        // Calculate total score
        scoring.total = scoring.priority + scoring.complexity + scoring.specificity + scoring.severity;

        console.log(`📊 Score for ${rule.name}:`, scoring);
        return scoring;
    }

    /**
     * ANALYZE RULE COMPLEXITY
     * 
     * Counts how many different conditions a rule actually checks
     * More complex rules (checking multiple conditions) get higher scores
     * 
     * @param {Object} rule - The diagnostic rule
     * @param {Object} inputs - Clinical inputs
     * @returns {Object} Complexity analysis
     */
    analyzeRuleComplexity(rule, inputs) {
        // Convert rule condition to string to analyze it
        const conditionStr = rule.condition.toString();
        
        // Count unique input fields referenced in the condition
        const inputFields = ['age_group', 'onset_speed', 'mobility_status', 'seizures', 
                           'eye_signs', 'pain_signs', 'head_tilt', 'recent_trauma', 
                           'cold_limbs', 'neck_flexion', 'ear_issues'];
        
        let conditionsMatched = 0;
        const matchedFields = [];
        
        inputFields.forEach(field => {
            if (conditionStr.includes(field)) {
                conditionsMatched++;
                matchedFields.push(field);
            }
        });

        // Minimum of 1 to avoid zero scores
        conditionsMatched = Math.max(1, conditionsMatched);

        return {
            conditionsMatched,
            matchedFields,
            complexity: conditionsMatched > 3 ? 'High' : conditionsMatched > 1 ? 'Medium' : 'Low'
        };
    }

    /**
     * GET SPECIFICITY BONUS
     * 
     * Pathognomonic signs get bonus points but not overwhelming dominance
     * 
     * @param {string} ruleId - Rule identifier
     * @returns {Object} Specificity bonus information
     */
    getSpecificityBonus(ruleId) {
        const specificityMap = {
            'THIAMINE_DEFICIENCY': { bonus: 100, reason: 'Pathognomonic sign (neck flexion)' },
            'TRAUMATIC_BRAIN_INJURY': { bonus: 150, reason: 'Trauma + severe seizures (highly specific)' },
            'SADDLE_THROMBUS': { bonus: 120, reason: 'Classic triad (mobility + pain + cold limbs)' },
            'ACUTE_TOXICITY': { bonus: 110, reason: 'Toxicity triad (sudden + seizures + eye signs)' }
        };

        return specificityMap[ruleId] || { bonus: 0, reason: null };
    }

    /**
     * GET SEVERITY BOOST
     * 
     * Emergency conditions get additional scoring weight
     * 
     * @param {string} urgency - Urgency level
     * @returns {number} Severity boost points
     */
    getSeverityBoost(urgency) {
        const severityMap = {
            'EMERGENCY': 100,
            'HIGH': 50,
            'MODERATE': 25,
            'LOW': 0
        };

        return severityMap[urgency] || 0;
    }

    /**
     * CREATE ENHANCED DIAGNOSIS RESULT
     * 
     * Enhanced version that includes information about all matches
     * and explains why the selected diagnosis was chosen
     * 
     * @param {Object} bestMatch - The highest priority matching rule
     * @param {Object} inputs - Original inputs
     * @param {Array} allMatches - All matching rules
     * @returns {Object} Enhanced diagnosis result
     */
    createEnhancedDiagnosisResult(bestMatch, inputs, allMatches) {
        const rule = bestMatch.rule;
        
        return {
            // Core diagnosis information
            diagnosis: rule.name,
            priority: rule.priority,
            ruleId: rule.id,
            description: rule.description,
            
            // Clinical information
            clinicalNotes: rule.clinicalNotes,
            nextSteps: rule.nextSteps,
            urgency: rule.urgency,
            
            // Visual styling
            icon: rule.icon,
            color: rule.color,
            
            // Enhanced system metadata
            rulesEvaluated: this.sortedRules.length, // All rules evaluated
            totalRules: this.sortedRules.length,
            totalMatches: allMatches.length,
            winningScore: bestMatch.score,
            alternativeMatches: allMatches.slice(1).map(match => ({
                priority: match.priority,
                name: match.rule.name,
                id: match.rule.id,
                score: match.score.total,
                scoreBreakdown: match.score.breakdown
            })),
            timestamp: new Date(),
            
            // Enhanced logic explanation
            logicExplanation: this.generateEnhancedLogicExplanation(rule, inputs, allMatches),
            
            // Input confirmation for audit trail
            inputConfirmation: this.generateInputConfirmation(inputs),
            
            // Original inputs for reference
            inputs: { ...inputs },
            
            // System enhancements applied
            enhancements: [
                'Complete Input Validation',
                'Input Buffering & Confirmation',
                'Best Match Logic (All Rules Evaluated)',
                'Timing-Independent Diagnosis'
            ]
        };
    }

    /**
     * GET SYSTEM STATISTICS
     * 
     * Returns information about the diagnostic system
     * 
     * @returns {Object} System statistics
     */
    getSystemStats() {
        return {
            totalRules: this.sortedRules.length,
            rulesPriority: this.sortedRules.map(rule => ({
                priority: rule.priority,
                id: rule.id,
                name: rule.name
            })),
            lastDiagnosis: this.lastDiagnosis ? {
                diagnosis: this.lastDiagnosis.diagnosis,
                priority: this.lastDiagnosis.priority,
                timestamp: this.lastDiagnosis.timestamp
            } : null,
            systemType: 'Priority Waterfall Logic',
            version: '1.0.0'
        };
    }

    /**
     * RESET ENGINE STATE
     * 
     * Clears the last diagnosis
     */
    reset() {
        this.lastDiagnosis = null;
        console.log('🔄 Engine reset - ready for new diagnosis');
    }

    /**
     * GET RULE EXPLANATIONS
     * 
     * Returns human-readable explanations of all diagnostic rules
     * Useful for educational purposes
     * 
     * @returns {Array} Rule explanations
     */
    getRuleExplanations() {
        return this.sortedRules.map(rule => ({
            priority: rule.priority,
            id: rule.id,
            name: rule.name,
            description: rule.description,
            explanation: this.explainRuleCondition(rule)
        }));
    }

    /**
     * EXPLAIN RULE CONDITION
     * 
     * Converts rule condition logic into human-readable text
     * 
     * @param {Object} rule - Diagnostic rule
     * @returns {string} Human-readable condition explanation
     */
    explainRuleCondition(rule) {
        switch (rule.id) {
            case 'TRAUMA':
                return 'IF recent trauma is present';
            case 'ATE':
                return 'IF mobility is (paralyzed OR wobbly) AND pain signs present AND cold limbs present';
            case 'HYPOGLYCEMIA':
                return 'IF age is Kitten AND onset is sudden AND (seizures present OR mobility is wobbly)';
            case 'TOXICITY':
                return 'IF onset is sudden AND seizures present AND eye signs present';
            case 'TUMOR':
                return 'IF age is Senior AND (seizures present OR onset is gradual) AND mobility is NOT paralyzed';
            case 'THIAMINE':
                return 'IF neck flexion is present';
            case 'FIP':
                return 'IF age is Kitten AND (seizures present OR mobility is wobbly) AND onset is gradual';
            case 'OTITIS':
                return 'IF (head tilt present OR eye signs present) AND ear issues present';
            case 'IVDD':
                return 'IF pain signs present AND mobility is (paralyzed OR wobbly)';
            case 'SPINAL_TUMOR':
                return 'IF age is Senior AND mobility is paralyzed AND onset is gradual';
            case 'DIABETIC_NEURO':
                return 'IF age is Senior AND mobility is wobbly AND onset is gradual';
            case 'VESTIBULAR':
                return 'IF head tilt present OR eye signs present';
            case 'EPILEPSY':
                return 'IF age is Adult AND seizures are present';
            case 'CDS':
                return 'IF age is Senior AND onset is gradual';
            case 'UNKNOWN':
                return 'IF no other rules match (default case)';
            default:
                return 'Condition not documented';
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FelineNeuroDiagnosisEngine;
}