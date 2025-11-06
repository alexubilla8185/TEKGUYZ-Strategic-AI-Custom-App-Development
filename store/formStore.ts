import { create } from 'zustand';
import { formStepsData, FormValues, Step, Field } from '../data/formStepsData';

type FormErrors = { [key: string]: string };

interface FormState {
    currentStep: number;
    totalSteps: number;
    formData: FormValues;
    isPrefilledFromChat: boolean;
    prefilledFields: string[];
    errors: FormErrors;
    isSubmitting: boolean;
    submitSuccess: boolean;
}

interface FormActions {
    initializePrefill: (prefillData: Partial<FormValues>) => void;
    setFormData: (field: string, value: any) => void;
    nextStep: () => void;
    prevStep: () => void;
    validateStep: (stepIndex: number) => boolean;
    handleSubmit: () => Promise<void>;
    resetForm: () => void;
    hasUserData: () => boolean;
}

const initialFormData: FormValues = {
    projectType: [],
    budget: '',
    timeline: '',
    description: '',
    currentSituation: '',
    goals: [],
    successMetrics: '',
    name: '',
    email: '',
    phone: '',
    company: '',
};

const initialState: FormState = {
    currentStep: 1,
    totalSteps: 5, // 4 form steps + 1 success screen
    formData: initialFormData,
    isPrefilledFromChat: false,
    prefilledFields: [],
    errors: {},
    isSubmitting: false,
    submitSuccess: false,
};

export const useFormStore = create<FormState & FormActions>((set, get) => ({
    ...initialState,
    
    initializePrefill: (prefillData) => {
        const prefilledFields = Object.keys(prefillData);
        set({
            formData: { ...initialFormData, ...prefillData },
            isPrefilledFromChat: true,
            prefilledFields,
            currentStep: 1,
            submitSuccess: false,
            errors: {},
        });
    },

    setFormData: (field, value) => {
        set((state) => ({
            formData: { ...state.formData, [field]: value },
            errors: { ...state.errors, [field]: '' }, // Clear error on change
        }));
    },
    
    nextStep: () => {
        const { validateStep, currentStep, totalSteps } = get();
        if (validateStep(currentStep - 1)) {
            set({ currentStep: Math.min(currentStep + 1, totalSteps) });
        }
    },

    prevStep: () => {
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) }));
    },
    
    validateStep: (stepIndex: number) => {
        const currentStepConfig = formStepsData[stepIndex];
        if (!currentStepConfig) return true; // Allow navigation from success screen etc.
        
        const { formData } = get();
        let newErrors: FormErrors = {};
        let isValid = true;

        currentStepConfig.fields.forEach((field: Field) => {
            if (field.validation) {
                const value = formData[field.name as keyof FormValues];
                const error = field.validation(value);
                if (error) {
                    newErrors[field.name] = error;
                    isValid = false;
                }
            }
        });
        
        set({ errors: newErrors });
        return isValid;
    },

    handleSubmit: async () => {
        if (!get().validateStep(get().currentStep - 1)) {
            return;
        }

        set({ isSubmitting: true, errors: {} });
        
        const netlifyFormData = new FormData();
        netlifyFormData.append('form-name', 'project-intake');
        
        Object.entries(get().formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                netlifyFormData.append(key, value.join(', '));
            } else {
                netlifyFormData.append(key, String(value));
            }
        });
        
        // Add a minimum delay to prevent UI flicker on fast connections
        const minSubmitTime = new Promise(resolve => setTimeout(resolve, 800));

        try {
            const responsePromise = fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(netlifyFormData as any).toString()
            });

            const [response] = await Promise.all([responsePromise, minSubmitTime]);

            if (response.ok) {
                set({ submitSuccess: true, currentStep: 5 });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            set({ errors: { submit: 'Submission failed. Please try again or email us directly.' } });
        } finally {
            set({ isSubmitting: false });
        }
    },
    
    resetForm: () => set(initialState),

    hasUserData: () => {
        const { formData } = get();
        return Object.values(formData).some(value => {
            if (Array.isArray(value)) return value.length > 0;
            return value !== '' && value !== null && value !== undefined;
        });
    }
}));