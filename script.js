/**
 * Feline Neurological Diagnosis Expert System - Main Application
 * 
 * This application implements a SINGLE OUTPUT diagnostic system using
 * Priority Waterfall Logic. The system evaluates diagnostic rules in
 * strict priority order and returns EXACTLY ONE diagnosis.
 * 
 * Educational Focus: Demonstrates expert system implementation with
 * deterministic, priority-based rule evaluation.
 */

class FelineNeuroDiagnosisApp {
    constructor() {
        console.log('🏗️ FelineNeuroDiagnosisApp constructor called');
        
        // Check if required classes exist
        if (typeof FelineNeuroDiagnosisEngine === 'undefined') {
            console.error('❌ FelineNeuroDiagnosisEngine class not found!');
            return;
        }
        if (typeof FelineNeuroDiagnosisData === 'undefined') {
            console.error('❌ FelineNeuroDiagnosisData object not found!');
            return;
        }
        
        console.log('✅ Required classes found, initializing engine...');
        
        // Initialize the diagnostic engine with knowledge base
        this.engine = new FelineNeuroDiagnosisEngine(FelineNeuroDiagnosisData);
        this.isAnalyzing = false;
        
        console.log('✅ Engine initialized, starting app init...');
        
        // Initialize the application
        this.init();
    }

    /**
     * APPLICATION INITIALIZATION
     * 
     * Sets up event listeners and prepares the interface
     */
    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
        this.validateForm(); // Initial form validation
        
        console.log('🐱 Feline Neurological Diagnosis System Ready');
        console.log('📋 Priority Waterfall Logic: Single Output System');
    }

    /**
     * EVENT LISTENER SETUP
     * 
     * Binds UI interactions to application logic
     */
    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        // Main diagnosis button
        const runBtn = document.getElementById('runDiagnosisBtn');
        if (runBtn) {
            console.log('✅ Found run diagnosis button, adding event listener');
            runBtn.addEventListener('click', (e) => {
                console.log('🖱️ Run diagnosis button clicked!');
                e.preventDefault();
                this.runDiagnosis();
            });
        } else {
            console.error('❌ Could not find run diagnosis button with ID: runDiagnosisBtn');
        }

        // Form validation on input changes
        const formInputs = document.querySelectorAll('#diagnosisForm select, #diagnosisForm input');
        console.log(`📝 Found ${formInputs.length} form inputs for validation`);
        formInputs.forEach((input, index) => {
            console.log(`📝 Adding change listener to input ${index}: ${input.id}`);
            input.addEventListener('change', () => {
                console.log(`📝 Input changed: ${input.id} = ${input.value}`);
                this.validateForm();
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to run diagnosis
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                console.log('⌨️ Keyboard shortcut triggered');
                if (!this.isAnalyzing && this.validateForm()) {
                    this.runDiagnosis();
                }
            }
        });
    }

    /**
     * COLLECT CLINICAL INPUTS
     * 
     * Gathers all form data and converts to engine-compatible format
     * 
     * @returns {Object} Clinical assessment inputs
     */
    collectInputs() {
        return {
            // Required dropdown selections
            age_group: document.getElementById('age_group').value,
            onset_speed: document.getElementById('onset_speed').value,
            mobility_status: document.getElementById('mobility_status').value,
            seizures: document.getElementById('seizures').value,
            
            // Boolean checkboxes (convert to true/false)
            eye_signs: document.getElementById('eye_signs').checked,
            pain_signs: document.getElementById('pain_signs').checked,
            head_tilt: document.getElementById('head_tilt').checked,
            recent_trauma: document.getElementById('recent_trauma').checked,
            cold_limbs: document.getElementById('cold_limbs').checked,
            neck_flexion: document.getElementById('neck_flexion').checked,
            ear_issues: document.getElementById('ear_issues').checked
        };
    }

    /**
     * ENHANCED DIAGNOSIS FUNCTION
     * 
     * Implements all four solutions:
     * 1. Complete Input Validation
     * 2. Input Buffering & Confirmation
     * 3. Best Match Logic
     * 4. Confirmation Step
     */
    async runDiagnosis() {
        console.log('🚀 Enhanced runDiagnosis() function called!');
        console.log('🔍 Current isAnalyzing state:', this.isAnalyzing);
        
        if (this.isAnalyzing) {
            console.log('⚠️ Already analyzing, returning early');
            return;
        }

        console.log('🔍 Starting Enhanced Priority Waterfall Diagnosis...');
        
        // Step 1: Collect clinical inputs
        const inputs = this.collectInputs();
        console.log('📊 Collected inputs:', inputs);
        
        // Step 2: Enhanced validation (SOLUTION 1)
        const validation = this.engine.validateCompleteInputs(inputs);
        if (!validation.isValid) {
            this.showNotification('Please complete all required fields before diagnosis', 'error');
            console.error('❌ Enhanced validation failed:', validation.errors);
            return;
        }

        // Step 3: Show confirmation dialog (SOLUTION 4)
        const confirmation = this.engine.generateInputConfirmation(inputs);
        const userConfirmed = await this.showConfirmationDialog(confirmation);
        
        if (!userConfirmed) {
            console.log('❌ User cancelled diagnosis');
            return;
        }

        // Step 4: Show loading and disable form
        this.isAnalyzing = true;
        this.showLoadingOverlay();
        this.disableForm();

        try {
            // Step 5: Simulate enhanced analysis process
            await this.simulateEnhancedAnalysis();
            
            // Step 6: Run the Enhanced Priority Waterfall Logic (SOLUTIONS 2 & 3)
            console.log('🧠 Running Enhanced Priority Waterfall Engine...');
            const diagnosis = this.engine.runDiagnosis(inputs, { skipConfirmation: true });
            
            console.log('✅ Enhanced diagnosis result:', diagnosis);
            
            // Step 7: Display the enhanced result
            this.displayEnhancedResult(diagnosis);
            this.hideLoadingOverlay();
            
            // Step 8: Show success notification (simplified)
            this.showNotification(`Enhanced Diagnosis Complete: ${diagnosis.diagnosis}`, 'success');
            
        } catch (error) {
            console.error('🚨 Enhanced diagnosis error:', error);
            this.showNotification('Enhanced analysis failed. Please check inputs and try again.', 'error');
            this.hideLoadingOverlay();
        } finally {
            // Step 9: Re-enable form
            this.isAnalyzing = false;
            this.enableForm();
        }
    }

    /**
     * SIMULATE ANALYSIS PROCESS
     * 
     * Provides visual feedback during diagnosis processing
     * Educational: Shows the step-by-step evaluation process
     */
    async simulateAnalysis() {
        const steps = [
            'Initializing Priority Waterfall Logic (30 Rules)...',
            'TIER 1: Evaluating Critical/Trauma Rules (1-5)...',
            'TIER 2: Evaluating Metabolic/Acute Rules (6-11)...',
            'TIER 3: Evaluating Infectious/Inflammatory Rules (12-16)...',
            'TIER 4: Evaluating Structural/Tumor Rules (17-21)...',
            'TIER 5: Evaluating Functional/Degenerative Rules (22-26)...',
            'TIER 6: Evaluating Exclusion Rules (27-30)...',
            'Finalizing Single Diagnosis Result...'
        ];

        for (let i = 0; i < steps.length; i++) {
            document.getElementById('loadingText').textContent = steps[i];
            await new Promise(resolve => setTimeout(resolve, 600));
        }
    }

    /**
     * SHOW CONFIRMATION DIALOG
     * 
     * SOLUTION 4: Shows input summary and asks for user confirmation
     * 
     * @param {Object} confirmation - Input confirmation object
     * @returns {Promise<boolean>} User confirmation result
     */
    async showConfirmationDialog(confirmation) {
        return new Promise((resolve) => {
            // Create confirmation dialog
            const dialog = document.createElement('div');
            dialog.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                font-family: 'Inter', sans-serif;
            `;
            
            dialog.innerHTML = `
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: var(--shadow-lg);
                ">
                    <h3 style="margin: 0 0 1rem 0; color: var(--primary-blue);">
                        🔍 Confirm Diagnosis Inputs
                    </h3>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <p style="font-weight: 500; margin-bottom: 0.5rem;">Summary:</p>
                        <p style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin: 0;">
                            ${confirmation.summary}
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <p style="font-weight: 500; margin-bottom: 0.5rem;">Clinical Signs:</p>
                        <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                            ${Object.entries(confirmation.details.clinicalSigns).map(([key, value]) => 
                                `<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                                    <span>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                    <span style="font-weight: 500;">${value}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <button id="cancelDiagnosis" style="
                            padding: 0.75rem 1.5rem;
                            border: 2px solid #6b7280;
                            background: white;
                            color: #6b7280;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 500;
                        ">Cancel</button>
                        <button id="confirmDiagnosis" style="
                            padding: 0.75rem 1.5rem;
                            border: 2px solid var(--primary-blue);
                            background: var(--primary-blue);
                            color: white;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 500;
                        ">🧠 Proceed with Enhanced Diagnosis</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(dialog);
            
            // Add event listeners
            document.getElementById('cancelDiagnosis').addEventListener('click', () => {
                document.body.removeChild(dialog);
                resolve(false);
            });
            
            document.getElementById('confirmDiagnosis').addEventListener('click', () => {
                document.body.removeChild(dialog);
                resolve(true);
            });
            
            // Close on escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    document.body.removeChild(dialog);
                    document.removeEventListener('keydown', handleEscape);
                    resolve(false);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    }

    /**
     * SIMULATE ENHANCED ANALYSIS PROCESS
     * 
     * Shows the enhanced evaluation process with all solutions
     */
    async simulateEnhancedAnalysis() {
        const steps = [
            'Initializing Enhanced Weighted Scoring Logic (30 Rules)...',
            'SOLUTION 1: Complete Input Validation ✓',
            'SOLUTION 2: Input Buffering & Confirmation ✓',
            'SOLUTION 3: Weighted Scoring Analysis (Anti-Dominance) ✓',
            'TIER 1: Critical/Trauma Rules (1-5)...',
            'TIER 2: Metabolic/Acute Rules (6-11)...',
            'TIER 3: Infectious/Inflammatory Rules (12-16)...',
            'TIER 4: Structural/Tumor Rules (17-21)...',
            'TIER 5: Functional/Degenerative Rules (22-26)...',
            'TIER 6: Exclusion Rules (27-30)...',
            'SOLUTION 4: Calculating weighted scores for all matches...',
            'SOLUTION 5: Selecting highest scoring match (prevents dominance)...',
            'Finalizing Enhanced Weighted Diagnosis Result...'
        ];

        for (let i = 0; i < steps.length; i++) {
            document.getElementById('loadingText').textContent = steps[i];
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    /**
     * DISPLAY ENHANCED RESULT
     * 
     * Shows the enhanced diagnosis result with all solution benefits
     * 
     * @param {Object} diagnosis - Enhanced diagnosis result from engine
     */
    displayEnhancedResult(diagnosis) {
        console.log('📋 Displaying enhanced diagnosis result...');
        
        // Hide empty state and show result
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('resultContainer').classList.remove('hidden');
        document.getElementById('resultContainer').classList.add('fade-in');

        // Populate result header with enhanced info
        document.getElementById('priorityNumber').textContent = diagnosis.priority;
        document.getElementById('diagnosisTitle').textContent = diagnosis.diagnosis;
        document.getElementById('ruleTriggered').textContent = 
            `Rule ${diagnosis.ruleId} Selected (Priority ${diagnosis.priority} of ${diagnosis.totalRules})`;

        // Populate result content
        document.getElementById('diagnosisDescription').textContent = diagnosis.description;
        
        // Clinical notes
        const clinicalNotesHtml = `
            <h4>Clinical Notes:</h4>
            <ul>
                ${diagnosis.clinicalNotes.map(note => `<li>${note}</li>`).join('')}
            </ul>
        `;
        document.getElementById('clinicalNotes').innerHTML = clinicalNotesHtml;
        
        // Next steps
        const nextStepsHtml = `
            <h4>Recommended Next Steps:</h4>
            <ul>
                ${diagnosis.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        `;
        document.getElementById('nextSteps').innerHTML = nextStepsHtml;
        
        // Enhanced logic explanation (no alternative matches)
        document.getElementById('logicExplanation').textContent = diagnosis.logicExplanation;
        
        // Apply urgency styling
        const resultCard = document.querySelector('.result-card');
        resultCard.className = `result-card urgency-${diagnosis.urgency.toLowerCase()}`;
        
        // Scroll to results
        document.getElementById('resultContainer').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Initialize chat for this diagnosis
        setTimeout(() => {
            updateChatForDiagnosis(diagnosis);
        }, 500);
        
        console.log('✅ Enhanced result displayed successfully');
    }

    /**
     * DISPLAY SINGLE RESULT
     * 
     * Shows the SINGLE diagnosis returned by the Priority Waterfall Logic
     * This demonstrates the "Single Output" requirement
     * 
     * @param {Object} diagnosis - Single diagnosis result from engine
     */
    displaySingleResult(diagnosis) {
        console.log('📋 Displaying single diagnosis result...');
        
        // Hide empty state and show result
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('resultContainer').classList.remove('hidden');
        document.getElementById('resultContainer').classList.add('fade-in');

        // Populate result header
        document.getElementById('priorityNumber').textContent = diagnosis.priority;
        document.getElementById('diagnosisTitle').textContent = diagnosis.diagnosis;
        document.getElementById('ruleTriggered').textContent = `Rule ${diagnosis.ruleId} Triggered (Priority ${diagnosis.priority})`;

        // Populate result content
        document.getElementById('diagnosisDescription').textContent = diagnosis.description;
        
        // Clinical notes
        const clinicalNotesHtml = `
            <h4>Clinical Notes:</h4>
            <ul>
                ${diagnosis.clinicalNotes.map(note => `<li>${note}</li>`).join('')}
            </ul>
        `;
        document.getElementById('clinicalNotes').innerHTML = clinicalNotesHtml;
        
        // Next steps
        const nextStepsHtml = `
            <h4>Recommended Next Steps:</h4>
            <ul>
                ${diagnosis.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        `;
        document.getElementById('nextSteps').innerHTML = nextStepsHtml;
        
        // Logic explanation (educational component)
        document.getElementById('logicExplanation').textContent = diagnosis.logicExplanation;
        
        // Apply urgency styling
        const resultCard = document.querySelector('.result-card');
        resultCard.className = `result-card urgency-${diagnosis.urgency.toLowerCase()}`;
        
        // Scroll to results
        document.getElementById('resultContainer').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        console.log('✅ Single result displayed successfully');
    }

    /**
     * ENHANCED FORM VALIDATION
     * 
     * SOLUTION 1: Requires ALL fields to be completed before allowing diagnosis
     * Shows completion percentage and missing fields
     * 
     * @returns {Object} Enhanced validation result
     */
    validateForm() {
        console.log('🔍 Enhanced validateForm() called');
        
        // Collect current inputs
        const inputs = this.collectInputs();
        
        // Use enhanced validation from engine
        const validation = this.engine.validateCompleteInputs(inputs);
        
        console.log(`📋 Enhanced validation result:`, validation);
        
        // Update button state and UI feedback
        const runBtn = document.getElementById('runDiagnosisBtn');
        const completionIndicator = document.getElementById('completionIndicator');
        
        if (runBtn) {
            runBtn.disabled = !validation.isValid;
            
            // Update visual feedback
            if (validation.isValid) {
                runBtn.style.opacity = '1';
                runBtn.style.cursor = 'pointer';
                runBtn.style.color = 'black';
                runBtn.textContent = '🧠 Run Enhanced Diagnosis';
                console.log('✅ Button enabled - all inputs complete');
            } else {
                runBtn.style.opacity = '0.6';
                runBtn.style.cursor = 'not-allowed';
                runBtn.style.color = 'var(--gray-500)';
                runBtn.textContent = `Complete All Fields (${validation.completeness.percentage}%)`;
                console.log(`❌ Button disabled - ${validation.completeness.missing} fields missing`);
            }
        }
        
        // Update completion indicator
        if (completionIndicator) {
            completionIndicator.innerHTML = `
                <div class="completion-bar">
                    <div class="completion-progress" style="width: ${validation.completeness.percentage}%"></div>
                </div>
                <div class="completion-text">
                    ${validation.completeness.completed}/${validation.completeness.total} fields completed (${validation.completeness.percentage}%)
                </div>
                ${validation.errors.length > 0 ? `
                    <div class="missing-fields">
                        Missing: ${validation.errors.join(', ')}
                    </div>
                ` : ''}
            `;
        }
        
        return validation;
    }

    /**
     * LOADING OVERLAY CONTROLS
     */
    showLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    hideLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    /**
     * FORM CONTROLS
     */
    disableForm() {
        const formElements = document.querySelectorAll('#diagnosisForm select, #diagnosisForm input, #runDiagnosisBtn');
        formElements.forEach(element => {
            element.disabled = true;
        });
    }

    enableForm() {
        const formElements = document.querySelectorAll('#diagnosisForm select, #diagnosisForm input');
        formElements.forEach(element => {
            element.disabled = false;
        });
        
        // Re-validate to set button state
        this.validateForm();
    }

    /**
     * NOTIFICATION SYSTEM
     * 
     * Shows user feedback messages
     * 
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info, warning)
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
            box-shadow: var(--shadow-lg);
            border: 1px solid;
        `;
        
        const colors = {
            success: 'background: var(--success-green); border-color: var(--success-green);',
            error: 'background: var(--emergency-red); border-color: var(--emergency-red);',
            warning: 'background: var(--warning-amber); border-color: var(--warning-amber);',
            info: 'background: var(--primary-blue); border-color: var(--primary-blue);'
        };
        
        notification.style.cssText += colors[type];
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
        
        // Add slide animations if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * SHOW WELCOME MESSAGE
     */
    showWelcomeMessage() {
        setTimeout(() => {
            this.showNotification('Enhanced Feline Neurological Diagnosis System Ready! 🐱', 'success');
        }, 1000);
    }

    /**
     * RESET APPLICATION
     * 
     * Clears form and results for new diagnosis
     */
    reset() {
        // Reset form
        document.getElementById('diagnosisForm').reset();
        
        // Hide results and show empty state
        document.getElementById('resultContainer').classList.add('hidden');
        document.getElementById('emptyState').classList.remove('hidden');
        
        // Reset engine
        this.engine.reset();
        
        // Re-validate form
        this.validateForm();
        
        this.showNotification('System reset - Ready for new diagnosis', 'info');
        console.log('🔄 Application reset');
    }

    /**
     * GET ENHANCED SYSTEM INFORMATION
     * 
     * Returns enhanced diagnostic system statistics and information
     * 
     * @returns {Object} Enhanced system information
     */
    getSystemInfo() {
        return {
            systemName: 'Enhanced Feline Neurological Diagnosis Expert System',
            version: '2.1.0',
            logicType: 'Weighted Scoring Logic (Anti-Dominance)',
            outputType: 'Single Diagnosis with Weighted Best Match Selection',
            enhancements: [
                'Complete Input Validation (Solution 1)',
                'Input Buffering & Confirmation (Solution 2)', 
                'Weighted Scoring Logic (Solution 3 Enhanced)',
                'Confirmation Step with Input Summary (Solution 4)',
                'Anti-Single-Condition-Dominance System (Solution 5)'
            ],
            engine: this.engine.getSystemStats(),
            features: [
                'Weighted scoring system (prevents single-condition dominance)',
                'Priority-based rule evaluation (1-30)',
                'Single output per diagnosis',
                'Condition complexity analysis',
                'Timing-independent diagnosis',
                'Input completion tracking',
                'Alternative match reporting with scores',
                'Educational rule explanations',
                'Medical-grade interface'
            ],
            improvements: {
                'Robustness': 'Eliminates timing dependency issues',
                'Completeness': 'Requires all inputs before diagnosis',
                'Fairness': 'Weighted scoring prevents single-condition dominance',
                'Transparency': 'Shows all matching rules with scores and selection logic',
                'User Experience': 'Confirmation dialog and progress tracking'
            }
        };
    }

    /**
     * DEMONSTRATE PRIORITY LOGIC
     * 
     * Educational function to show how priority waterfall works
     * This can be called from browser console for demonstration
     */
    demonstratePriorityLogic() {
        console.log('🎓 EDUCATIONAL DEMONSTRATION: Priority Waterfall Logic');
        console.log('================================================');
        
        const rules = this.engine.getRuleExplanations();
        rules.forEach(rule => {
            console.log(`Priority ${rule.priority}: ${rule.name}`);
            console.log(`  Condition: ${rule.explanation}`);
            console.log(`  Description: ${rule.description}`);
            console.log('');
        });
        
        console.log('🔄 How it works:');
        console.log('1. Rules are evaluated in EXACT priority order (1-8)');
        console.log('2. The FIRST matching rule determines the diagnosis');
        console.log('3. Evaluation STOPS immediately after first match');
        console.log('4. Lower priority rules are NEVER evaluated once a match is found');
        console.log('5. System returns EXACTLY ONE diagnosis per evaluation');
        
        return rules;
    }
}

/**
 * APPLICATION INITIALIZATION
 * 
 * Initialize the application when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create global application instance
    window.felineNeuroDiagnosisApp = new FelineNeuroDiagnosisApp();
    
    // Make demonstration function available globally for educational purposes
    window.demonstratePriorityLogic = () => window.felineNeuroDiagnosisApp.demonstratePriorityLogic();
    
    console.log('🎓 Educational Note: Type "demonstratePriorityLogic()" in console to see how the priority waterfall works');
});

/**
 * COMPACT CHAT FUNCTIONALITY
 * 
 * Simple chat interface integrated into the diagnosis result
 */

// Initialize compact chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCompactChat();
});

function initializeCompactChat() {
    console.log('🤖 Initializing compact chat...');
    
    // Toggle chat functionality
    const toggleBtn = document.getElementById('toggleChat');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleCompactChat);
    }
    
    // Send message functionality
    const sendBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', sendChatMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
        
        chatInput.addEventListener('input', () => {
            sendBtn.disabled = chatInput.value.trim().length === 0;
        });
    }
    
    // Quick question buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-question-btn')) {
            const question = e.target.getAttribute('data-question');
            sendQuickQuestion(question);
        }
    });
}

function toggleCompactChat() {
    const chatSection = document.querySelector('.chat-section');
    const toggleBtn = document.getElementById('toggleChat');
    
    if (chatSection.classList.contains('collapsed')) {
        chatSection.classList.remove('collapsed');
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    } else {
        chatSection.classList.add('collapsed');
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    }
}

async function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage('user', message);
    
    // Clear input and disable
    chatInput.value = '';
    document.getElementById('sendChatBtn').disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get current diagnosis context
        const currentDiagnosis = getCurrentDiagnosisContext();
        
        // Call Gemini API using AIService
        const response = await AIService.chat(message, currentDiagnosis);
        
        hideTypingIndicator();
        addChatMessage('assistant', response);
        
    } catch (error) {
        console.error('Chat error:', error);
        hideTypingIndicator();
        
        let errorMessage = "I'm sorry, I'm having trouble connecting right now. ";
        
        if (error.message.includes('API key')) {
            errorMessage += "Please check that your API key is properly configured in the code.";
            addChatError(errorMessage);
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            errorMessage += "It looks like you've reached your API usage limit. Please check your Google Cloud console.";
            addChatError(errorMessage);
        } else if (error.message.includes('safety')) {
            errorMessage += "The message was blocked by safety filters. Please rephrase your question.";
            addChatWarning(errorMessage);
        } else {
            errorMessage += "Please consult with your veterinarian for medical advice about your cat's condition.";
            addChatMessage('assistant', errorMessage);
        }
    } finally {
        // Re-enable input
        chatInput.disabled = false;
        chatInput.focus();
    }
}

function addChatError(message) {
    const chatMessages = document.getElementById('chatMessages');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'chat-error';
    errorDiv.innerHTML = `<i class="fa-solid fa-exclamation-triangle"></i> ${message}`;
    chatMessages.appendChild(errorDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addChatWarning(message) {
    const chatMessages = document.getElementById('chatMessages');
    const warningDiv = document.createElement('div');
    warningDiv.className = 'chat-warning';
    warningDiv.innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> ${message}`;
    chatMessages.appendChild(warningDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendQuickQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = question;
    sendChatMessage();
}

function addChatMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <span>AI is typing</span>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function updateChatForDiagnosis(diagnosis) {
    // Update welcome message based on diagnosis
    const chatMessages = document.getElementById('chatMessages');
    const welcomeMessage = chatMessages.querySelector('.assistant-message .message-content p');
    
    if (welcomeMessage && diagnosis) {
        welcomeMessage.textContent = `💬 I can help explain your cat's diagnosis of ${diagnosis.diagnosis}. Feel free to ask any questions!`;
    }
    
    // Update quick questions based on urgency
    updateQuickQuestions(diagnosis);
    
    // Update chat input placeholder
    const chatInput = document.getElementById('chatInput');
    if (chatInput && diagnosis) {
        chatInput.placeholder = `Ask about ${diagnosis.diagnosis}...`;
    }
}

function updateQuickQuestions(diagnosis) {
    const questionButtons = document.querySelector('.question-buttons');
    if (!questionButtons) return;
    
    let questions = [];
    
    if (diagnosis) {
        switch (diagnosis.urgency) {
            case 'EMERGENCY':
                questions = [
                    "How urgent is this?",
                    "What should I do now?",
                    "Emergency care steps?"
                ];
                break;
            case 'HIGH':
                questions = [
                    "How serious is this?",
                    "Can this wait?",
                    "Treatment options?"
                ];
                break;
            default:
                questions = [
                    "What does this mean?",
                    "How is this treated?",
                    "Long-term outlook?"
                ];
        }
    } else {
        // Default questions when no diagnosis
        questions = [
            "How does this diagnosis system work?",
            "What should I look for in my cat?",
            "When should I see a vet?"
        ];
    }
    
    questionButtons.innerHTML = questions.map(q => `
        <button class="quick-question-btn" data-question="${q}">
            ${q}
        </button>
    `).join('');
}

/**
 * Get current diagnosis context for chat
 */
function getCurrentDiagnosisContext() {
    try {
        // Check if there's a current diagnosis displayed
        const diagnosisTitle = document.getElementById('diagnosisTitle');
        const diagnosisDescription = document.getElementById('diagnosisDescription');
        const resultContainer = document.getElementById('resultContainer');
        
        if (resultContainer && !resultContainer.classList.contains('hidden') && diagnosisTitle) {
            // Extract urgency from CSS class
            const resultCard = document.querySelector('.result-card');
            let urgency = 'UNKNOWN';
            if (resultCard) {
                if (resultCard.classList.contains('urgency-emergency')) urgency = 'EMERGENCY';
                else if (resultCard.classList.contains('urgency-high')) urgency = 'HIGH';
                else if (resultCard.classList.contains('urgency-moderate')) urgency = 'MODERATE';
                else if (resultCard.classList.contains('urgency-low')) urgency = 'LOW';
            }
            
            // Extract clinical notes
            const clinicalNotesElement = document.getElementById('clinicalNotes');
            let clinicalNotes = [];
            if (clinicalNotesElement) {
                const notesList = clinicalNotesElement.querySelectorAll('li');
                clinicalNotes = Array.from(notesList).map(li => li.textContent);
            }
            
            return {
                diagnosis: diagnosisTitle.textContent,
                description: diagnosisDescription ? diagnosisDescription.textContent : '',
                urgency: urgency,
                clinicalNotes: clinicalNotes
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error getting diagnosis context:', error);
        return null;
    }
}

console.log('🤖 Compact chat functionality loaded');