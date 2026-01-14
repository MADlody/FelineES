/**
 * Feline Neurological Diagnosis Application
 * Forward Chaining Implementation
 */

class FelineNeuroDiagnosisApp {
    constructor() {
        console.log('🐱 Initializing Feline Neurological Diagnosis App...');
        
        // Check if required classes exist
        if (typeof FelineNeuroForwardChainingEngine === 'undefined') {
            console.error('❌ FelineNeuroForwardChainingEngine class not found!');
            return;
        }
        
        if (typeof FelineNeuroDiagnosisData === 'undefined') {
            console.error('❌ FelineNeuroDiagnosisData not found!');
            return;
        }
        
        // Initialize the forward chaining engine
        this.engine = new FelineNeuroForwardChainingEngine(FelineNeuroDiagnosisData);
        this.isAnalyzing = false;
        
        // Initialize UI
        this.initializeUI();
        
        console.log('✅ Application initialized successfully');
    }

    /**
     * Initialize UI event listeners and form validation
     */
    initializeUI() {
        console.log('🎨 Setting up UI event listeners...');
        
        // Main diagnosis button
        const runBtn = document.getElementById('runDiagnosisBtn');
        if (runBtn) {
            console.log('✅ Found run diagnosis button, adding event listener');
            runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.runDiagnosis();
            });
        } else {
            console.error('❌ Could not find run diagnosis button with ID: runDiagnosisBtn');
        }

        // Form validation listeners
        this.setupFormValidation();
        
        console.log('✅ UI initialization complete');
    }

    /**
     * Set up real-time form validation
     */
    setupFormValidation() {
        const form = document.getElementById('diagnosisForm');
        if (!form) return;

        // Listen for changes on all form inputs
        const inputs = form.querySelectorAll('select, input[type="checkbox"]');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateFormCompleteness();
            });
        });

        // Initial validation
        this.updateFormCompleteness();
    }

    /**
     * Update form completeness indicator
     */
    updateFormCompleteness() {
        const inputs = this.collectInputs();
        const completeness = this.calculateInputCompleteness(inputs);
        
        const indicator = document.getElementById('completionIndicator');
        const runBtn = document.getElementById('runDiagnosisBtn');
        
        if (indicator && runBtn) {
            if (completeness.isComplete) {
                indicator.innerHTML = `
                    <div class="completion-ready">
                        <i class="fa-solid fa-check-circle"></i>
                        <span>Ready for diagnosis</span>
                    </div>
                `;
                runBtn.disabled = false;
                runBtn.classList.remove('disabled');
            } else {
                indicator.innerHTML = `
                    <div class="completion-pending">
                        <i class="fa-solid fa-clock"></i>
                        <span>Complete all required fields (${completeness.completed}/${completeness.total})</span>
                    </div>
                `;
                runBtn.disabled = true;
                runBtn.classList.add('disabled');
            }
        }
    }

    /**
     * Calculate form completeness
     */
    calculateInputCompleteness(inputs) {
        const requiredFields = ['age_group', 'onset_speed', 'mobility_status', 'seizures'];
        const booleanFields = ['eye_signs', 'pain_signs', 'head_tilt', 'recent_trauma', 'cold_limbs', 'neck_flexion', 'ear_issues'];
        
        const totalFields = requiredFields.length + booleanFields.length;
        let completed = 0;
        
        // Check required dropdowns
        requiredFields.forEach(field => {
            if (inputs[field] && inputs[field] !== '') {
                completed++;
            }
        });
        
        // Check boolean fields (they're always "complete" since they default to false)
        completed += booleanFields.length;
        
        const isComplete = requiredFields.every(field => inputs[field] && inputs[field] !== '');
        
        return {
            completed,
            total: totalFields,
            isComplete
        };
    }

    /**
     * Main diagnosis execution
     */
    async runDiagnosis() {
        if (this.isAnalyzing) {
            console.log('⏳ Diagnosis already in progress...');
            return;
        }

        try {
            console.log('🚀 Starting forward chaining diagnosis...');
            this.isAnalyzing = true;
            
            // Show loading
            this.showLoadingOverlay();
            
            // Collect and validate inputs
            const inputs = this.collectInputs();
            console.log('📝 Collected inputs:', inputs);
            
            // Validate inputs
            if (!this.validateInputs(inputs)) {
                this.hideLoadingOverlay();
                this.isAnalyzing = false;
                return;
            }
            
            // Run forward chaining diagnosis
            console.log('🧠 Running forward chaining engine...');
            const diagnosis = this.engine.runDiagnosis(inputs, { skipConfirmation: true });
            
            console.log('✅ Forward chaining diagnosis result:', diagnosis);
            
            // Display result
            this.displayResult(diagnosis);
            
        } catch (error) {
            console.error('❌ Diagnosis error:', error);
            alert('An error occurred during diagnosis. Please try again.');
        } finally {
            this.hideLoadingOverlay();
            this.isAnalyzing = false;
        }
    }

    /**
     * Collect form inputs
     */
    collectInputs() {
        const inputs = {};
        
        // Collect dropdown values
        const selects = ['age_group', 'onset_speed', 'mobility_status', 'seizures'];
        selects.forEach(id => {
            const element = document.getElementById(id);
            inputs[id] = element ? element.value : '';
        });
        
        // Collect checkbox values
        const checkboxes = ['eye_signs', 'pain_signs', 'head_tilt', 'recent_trauma', 'cold_limbs', 'neck_flexion', 'ear_issues'];
        checkboxes.forEach(id => {
            const element = document.getElementById(id);
            inputs[id] = element ? element.checked : false;
        });
        
        return inputs;
    }

    /**
     * Validate inputs
     */
    validateInputs(inputs) {
        const requiredFields = ['age_group', 'onset_speed', 'mobility_status', 'seizures'];
        
        for (let field of requiredFields) {
            if (!inputs[field] || inputs[field] === '') {
                alert(`Please select a value for ${field.replace('_', ' ')}`);
                return false;
            }
        }
        
        return true;
    }

    /**
     * Display diagnosis result
     */
    displayResult(diagnosis) {
        console.log('📋 Displaying diagnosis result...');
        
        // Hide empty state and show result
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('resultContainer').classList.remove('hidden');
        
        // Populate result
        document.getElementById('priorityNumber').textContent = diagnosis.priority;
        document.getElementById('diagnosisTitle').textContent = diagnosis.diagnosis;
        document.getElementById('ruleTriggered').textContent = `Forward Chaining Result`;
        document.getElementById('diagnosisDescription').textContent = diagnosis.description;
        
        // Clinical notes
        const clinicalNotes = document.getElementById('clinicalNotes');
        if (diagnosis.clinicalNotes && diagnosis.clinicalNotes.length > 0) {
            clinicalNotes.innerHTML = `
                <h4><i class="fa-solid fa-notes-medical"></i> Clinical Notes</h4>
                <ul>
                    ${diagnosis.clinicalNotes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            `;
        }
        
        // Next steps
        const nextSteps = document.getElementById('nextSteps');
        if (diagnosis.nextSteps && diagnosis.nextSteps.length > 0) {
            nextSteps.innerHTML = `
                <h4><i class="fa-solid fa-list-check"></i> Recommended Next Steps</h4>
                <ul>
                    ${diagnosis.nextSteps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            `;
        }
        
        // Logic explanation
        const logicExplanation = document.getElementById('logicExplanation');
        if (diagnosis.logicExplanation) {
            logicExplanation.textContent = diagnosis.logicExplanation;
        }
        
        // Apply urgency styling
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
            resultCard.className = `result-card urgency-${diagnosis.urgency.toLowerCase()}`;
        }
        
        // Scroll to results
        document.getElementById('resultContainer').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        console.log('✅ Result displayed successfully');
    }

    /**
     * Show loading overlay
     */
    showLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    /**
     * Hide loading overlay
     */
    hideLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }
}

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    window.felineNeuroDiagnosisApp = new FelineNeuroDiagnosisApp();
});