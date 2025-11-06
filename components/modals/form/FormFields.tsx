import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { useFormStore } from '../../../store/formStore';
import { Field } from '../../../data/formStepsData';
import { useRipple } from '../../../hooks/useRipple';

type FieldProps = { field: Field };

const usePrefillAnimation = (fieldName: string) => {
    const { prefilledFields } = useFormStore();
    return prefilledFields.includes(fieldName);
};

const FieldFeedback: React.FC<{field: Field}> = ({ field }) => {
    const { errors } = useFormStore();
    const error = errors[field.name];
    const errorId = error ? `${field.name}-error` : undefined;
    const helperId = field.helperText && !error ? `${field.name}-helper` : undefined;

    return (
        <div className="h-4 mt-1 px-1"> 
            <AnimatePresence>
                {error && (
                    <motion.p
                        id={errorId}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm text-error flex items-center gap-1.5"
                        role="alert"
                    >
                        <AlertCircle size={14} />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
            {!error && field.helperText && <p id={helperId} className="text-sm text-on-surface-variant">{field.helperText}</p>}
        </div>
    )
}

const commonInputClasses = "w-full h-[56px] px-4 py-3.5 bg-surface-container-low border rounded-[12px] text-base text-on-surface placeholder-on-surface-variant placeholder-opacity-70 transition-all duration-200 ease-out";
const getBorderClasses = (error: boolean, isFocused: boolean) => {
    if (error) return 'border-2 border-error';
    if (isFocused) return 'border-2 border-primary';
    return 'border border-outline-variant';
};

const FieldLabel: React.FC<{field: Field}> = ({ field }) => (
    <label htmlFor={field.name} className="block text-base font-medium text-on-surface mb-2">
        {field.label} {field.validation && <span className="text-error ml-1" aria-hidden="true">*</span>}
    </label>
);

export const TextInput: React.FC<FieldProps> = ({ field }) => {
    const { formData, errors, setFormData } = useFormStore();
    const [isFocused, setIsFocused] = useState(false);
    const shouldAnimate = usePrefillAnimation(field.name);
    const value = formData[field.name as keyof typeof formData] as string || '';
    const error = errors[field.name];
    const errorId = error ? `${field.name}-error` : undefined;
    const helperId = field.helperText && !error ? `${field.name}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ');

    return (
        <div>
            <FieldLabel field={field} />
            <motion.input
                animate={shouldAnimate ? { 
                    borderColor: ['var(--outline-variant)', 'var(--primary-40)', 'var(--outline-variant)'],
                    backgroundColor: ['var(--surface-container-low)', 'var(--primary-10)', 'var(--surface-container-low)'],
                    scale: [1, 1.02, 1],
                } : {}}
                transition={{ duration: 1.2, times: [0, 0.5, 1] }}
                type={field.type}
                id={field.name}
                name={field.name}
                value={value}
                onChange={(e) => setFormData(field.name, e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={field.placeholder}
                className={`${commonInputClasses} ${getBorderClasses(!!error, isFocused)} ${isFocused ? 'bg-surface-container' : ''}`}
                aria-invalid={!!error}
                aria-required={!!field.validation}
                aria-describedby={describedBy || undefined}
                autoComplete={field.autoComplete}
            />
            <FieldFeedback field={field} />
        </div>
    );
};

export const SelectInput: React.FC<FieldProps> = ({ field }) => {
    const { formData, errors, setFormData } = useFormStore();
    const [isFocused, setIsFocused] = useState(false);
    const shouldAnimate = usePrefillAnimation(field.name);
    const value = formData[field.name as keyof typeof formData] as string || '';
    const error = errors[field.name];
    const errorId = error ? `${field.name}-error` : undefined;
    const helperId = field.helperText && !error ? `${field.name}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ');

    return (
        <div>
             <FieldLabel field={field} />
            <motion.select
                animate={shouldAnimate ? { 
                    borderColor: ['var(--outline-variant)', 'var(--primary-40)', 'var(--outline-variant)'],
                    backgroundColor: ['var(--surface-container-low)', 'var(--primary-10)', 'var(--surface-container-low)'],
                    scale: [1, 1.02, 1],
                 } : {}}
                transition={{ duration: 1.2, times: [0, 0.5, 1] }}
                id={field.name}
                name={field.name}
                value={value}
                onChange={(e) => setFormData(field.name, e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`${commonInputClasses} ${getBorderClasses(!!error, isFocused)} ${isFocused ? 'bg-surface-container' : ''} ${!value ? 'text-on-surface-variant' : ''}`}
                aria-invalid={!!error}
                aria-required={!!field.validation}
                aria-describedby={describedBy || undefined}
            >
                {field.options?.map(option => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>{option.label}</option>
                ))}
            </select>
            <FieldFeedback field={field} />
        </div>
    );
};

export const TextareaInput: React.FC<FieldProps> = ({ field }) => {
    const { formData, errors, setFormData } = useFormStore();
    const [isFocused, setIsFocused] = useState(false);
    const shouldAnimate = usePrefillAnimation(field.name);
    const value = formData[field.name as keyof typeof formData] as string || '';
    const valueLength = value?.length || 0;
    const error = errors[field.name];
    const errorId = error ? `${field.name}-error` : undefined;
    const helperId = field.helperText && !error ? `${field.name}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ');

    return (
        <div>
             <FieldLabel field={field} />
            <div className="relative">
                <motion.textarea
                    animate={shouldAnimate ? { 
                        borderColor: ['var(--outline-variant)', 'var(--primary-40)', 'var(--outline-variant)'],
                        backgroundColor: ['var(--surface-container-low)', 'var(--primary-10)', 'var(--surface-container-low)'],
                        scale: [1, 1.02, 1],
                     } : {}}
                    transition={{ duration: 1.2, times: [0, 0.5, 1] }}
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={(e) => setFormData(field.name, e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={field.placeholder}
                    className={`${commonInputClasses.replace('h-[56px]', '')} py-3.5 min-h-[140px] resize-y ${getBorderClasses(!!error, isFocused)} ${isFocused ? 'bg-surface-container' : ''}`}
                    maxLength={field.maxLength}
                    aria-invalid={!!error}
                    aria-required={!!field.validation}
                    aria-describedby={describedBy || undefined}
                />
                {field.maxLength && (
                    <span className="absolute bottom-2 right-3 text-sm text-on-surface-variant" aria-hidden="true">
                        {valueLength}/{field.maxLength}
                    </span>
                )}
            </div>
            <FieldFeedback field={field} />
        </div>
    );
};

export const RadioChipGroup: React.FC<FieldProps> = ({ field }) => {
    const { formData, setFormData, errors } = useFormStore();
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>();
    const selectedValue = formData[field.name as keyof typeof formData] as string;
    const shouldAnimate = usePrefillAnimation(field.name);
    const error = errors[field.name];
    const errorId = error ? `${field.name}-error` : undefined;
    
    return (
        <fieldset aria-describedby={errorId}>
            <legend className="block text-base font-medium text-on-surface mb-2">
                {field.label} {field.validation && <span className="text-error ml-1" aria-hidden="true">*</span>}
            </legend>
            <div role="radiogroup" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {field.options?.map(option => {
                    const isSelected = selectedValue === option.value;
                    const Icon = option.icon;
                    return (
                        <motion.button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={(e) => { addRipple(e); setFormData(field.name, option.value); }}
                            animate={(shouldAnimate && isSelected) ? { 
                                borderColor: ['var(--primary)', 'var(--outline-variant)', 'var(--primary)'], 
                                scale: [1, 1.02, 1] 
                            } : {}}
                            transition={{ duration: 1.2 }}
                            className={`relative min-h-[64px] flex items-center justify-start px-5 py-4 rounded-[24px] border text-left transition-all duration-200 overflow-hidden
                                ${isSelected ? 'bg-primary-10 border-2 border-primary' : `bg-surface-container-low border-outline-variant hover:border-outline hover:bg-surface-container ${error ? 'border-error' : ''}`}`}
                        >
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        <Check size={16} className="text-white"/>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="flex items-center gap-3">
                                {Icon && <Icon size={28} className={isSelected ? 'text-primary' : 'text-on-surface-variant'} aria-hidden="true" />}
                                <span className={`font-medium text-base ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{option.label}</span>
                            </div>
                            <RippleElements />
                        </motion.button>
                    )
                })}
            </div>
             <div className="h-4 mt-1 px-1">
                <AnimatePresence>
                    {error && (
                        <motion.p
                            id={errorId}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-sm text-error flex items-center gap-1.5"
                            role="alert"
                        >
                             <AlertCircle size={14} />
                             {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </fieldset>
    );
};

export const CheckboxChipGroup: React.FC<FieldProps> = ({ field }) => {
    const { formData, setFormData, errors } = useFormStore();
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>();
    const selectedValues = (formData[field.name as keyof typeof formData] as string[]) || [];
    const error = errors[field.name];
    const errorId = error ? `${field.name}-error` : undefined;

    const handleToggle = (value: string) => {
        const newSelection = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        setFormData(field.name, newSelection);
    };

    return (
        <fieldset aria-describedby={errorId}>
            <legend className="block text-base font-medium text-on-surface mb-2">
                {field.label} {field.validation && <span className="text-error ml-1" aria-hidden="true">*</span>}
            </legend>
            <div role="group" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {field.options?.map(option => {
                    const isSelected = selectedValues.includes(option.value);
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="checkbox"
                            aria-checked={isSelected}
                            onClick={(e) => { addRipple(e); handleToggle(option.value); }}
                            className={`relative min-h-[64px] flex items-center justify-start px-5 py-4 rounded-[24px] border text-left transition-all duration-200 overflow-hidden
                                ${isSelected ? 'bg-primary-10 border-2 border-primary' : `bg-surface-container-low border-outline-variant hover:border-outline hover:bg-surface-container ${error ? 'border-error' : ''}`}`}
                        >
                           <AnimatePresence>
                             {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                                    aria-hidden="true"
                                >
                                     <Check size={16} className="text-white" />
                                </motion.div>
                            )}
                           </AnimatePresence>
                            <div className="flex items-center gap-3">
                                {Icon && <Icon size={28} className={isSelected ? 'text-primary' : 'text-on-surface-variant'} aria-hidden="true"/>}
                                <span className={`font-medium text-base ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{option.label}</span>
                            </div>
                            <RippleElements />
                        </button>
                    )
                })}
            </div>
            <div className="h-4 mt-1 px-1">
                <AnimatePresence>
                    {error && (
                         <motion.p
                            id={errorId}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-sm text-error flex items-center gap-1.5"
                            role="alert"
                        >
                            <AlertCircle size={14} />
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </fieldset>
    );
};