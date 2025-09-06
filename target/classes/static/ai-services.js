// AI Services JavaScript
const demoContent = {
    predictive: {
        title: 'Predictive Analytics Demo',
        content: `
            <div style="text-align: left;">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Patient Risk Assessment</h4>
                <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Patient ID:</strong> P-12345</p>
                    <p><strong>Age:</strong> 65 years</p>
                    <p><strong>Conditions:</strong> Diabetes, Hypertension</p>
                    <div style="margin-top: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Cardiovascular Risk:</span>
                            <span style="color: orange; font-weight: bold;">Medium (68%)</span>
                        </div>
                        <div style="background: #f0f0f0; height: 8px; border-radius: 4px;">
                            <div style="background: orange; width: 68%; height: 100%; border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>
                <div style="background: white; padding: 1.5rem; border-radius: 8px;">
                    <h5 style="color: var(--primary); margin-bottom: 0.5rem;">AI Recommendations:</h5>
                    <ul style="color: var(--muted-foreground);">
                        <li>Monitor blood pressure more frequently</li>
                        <li>Adjust diabetes medication dosage</li>
                        <li>Schedule cardiology consultation</li>
                        <li>Recommend lifestyle modifications</li>
                    </ul>
                </div>
            </div>
        `
    },
    insights: {
        title: 'Health Insights Demo',
        content: `
            <div style="text-align: left;">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Treatment Pattern Analysis</h4>
                <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h5 style="color: var(--primary); margin-bottom: 0.5rem;">Recovery Trends</h5>
                            <div style="height: 120px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--muted-foreground);">
                                📈 Recovery Rate: +15% faster than average
                            </div>
                        </div>
                        <div>
                            <h5 style="color: var(--primary); margin-bottom: 0.5rem;">Medication Effectiveness</h5>
                            <div style="background: #e8f5e8; padding: 1rem; border-radius: 8px;">
                                <p style="margin: 0; color: var(--success); font-weight: bold;">Optimal Response</p>
                                <small style="color: var(--muted-foreground);">Current treatment plan showing excellent results</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="background: white; padding: 1.5rem; border-radius: 8px;">
                    <h5 style="color: var(--primary); margin-bottom: 0.5rem;">Personalized Insights:</h5>
                    <p style="color: var(--muted-foreground); margin: 0;">Based on analysis of similar cases, this patient would benefit from increased physical therapy sessions and dietary adjustments to optimize recovery time.</p>
                </div>
            </div>
        `
    },
    chatbot: {
        title: 'AI Chatbot Assistant Demo',
        content: `
            <div style="display: flex; flex-direction: column; height: 350px;">
                <div style="flex: 1; background: white; border-radius: 8px; padding: 1rem; overflow-y: auto; border: 1px solid var(--border);">
                    <div id="chatMessages">
                        <div style="margin-bottom: 1rem;">
                            <div style="background: var(--primary); color: white; padding: 0.75rem; border-radius: 12px; max-width: 80%; margin-bottom: 0.5rem;">
                                Hello! I'm your MediLive AI assistant. How can I help you today?
                            </div>
                        </div>
                        <div style="margin-bottom: 1rem; text-align: right;">
                            <div style="background: var(--muted); color: var(--foreground); padding: 0.75rem; border-radius: 12px; max-width: 80%; margin-left: auto; margin-bottom: 0.5rem;">
                                Can you help me understand my medication schedule?
                            </div>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <div style="background: var(--primary); color: white; padding: 0.75rem; border-radius: 12px; max-width: 80%; margin-bottom: 0.5rem;">
                                I'd be happy to help! I can provide information about medication timing, dosages, and interactions. Would you like me to review your current prescriptions?
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <input type="text" id="chatInput" placeholder="Type your message..." style="flex: 1; padding: 0.75rem; border: 2px solid var(--border); border-radius: 8px;" />
                    <button onclick="sendMessage()" style="background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">Send</button>
                </div>
            </div>
        `
    }
};

function openDemo(serviceType) {
    const demoArea = document.getElementById('demoArea');
    const demoTitle = document.getElementById('demoTitle');
    const demoContent = document.getElementById('demoContent');
    
    demoTitle.textContent = demoContent[serviceType].title;
    demoContent.innerHTML = demoContent[serviceType].content;
    
    demoArea.style.display = 'block';
    demoArea.scrollIntoView({ behavior: 'smooth' });
}

function closeDemo() {
    const demoArea = document.getElementById('demoArea');
    demoArea.style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    
    if (!input.value.trim()) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.style.cssText = 'margin-bottom: 1rem; text-align: right;';
    userMessage.innerHTML = `
        <div style="background: var(--muted); color: var(--foreground); padding: 0.75rem; border-radius: 12px; max-width: 80%; margin-left: auto;">
            ${input.value}
        </div>
    `;
    messages.appendChild(userMessage);
    
    const userText = input.value;
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.style.cssText = 'margin-bottom: 1rem;';
        
        let response = "I understand your question. ";
        if (userText.toLowerCase().includes('medication')) {
            response += "For medication-related questions, I recommend consulting with your healthcare provider for personalized advice.";
        } else if (userText.toLowerCase().includes('appointment')) {
            response += "I can help you schedule appointments. Would you like me to check available slots?";
        } else {
            response += "Could you provide more details so I can better assist you?";
        }
        
        aiMessage.innerHTML = `
            <div style="background: var(--primary); color: white; padding: 0.75rem; border-radius: 12px; max-width: 80%;">
                ${response}
            </div>
        `;
        messages.appendChild(aiMessage);
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
    
    messages.scrollTop = messages.scrollHeight;
}

// Handle Enter key in chat
document.addEventListener('keydown', function(e) {
    const chatInput = document.getElementById('chatInput');
    if (e.key === 'Enter' && chatInput && document.activeElement === chatInput) {
        sendMessage();
    }
});

// Initialize page animations
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});