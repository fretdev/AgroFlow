package com.agroflow.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ValueOfEnumValidator implements ConstraintValidator<ValueOfEnum,CharSequence> {
    private List<String> acceptedValues;

    @Override
    public void initialize(ValueOfEnum annotation){
        acceptedValues = Stream.of(annotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context){
        if (value == null) return true;
        boolean isValid = acceptedValues.contains(value.toString());

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Invalid role. Must be one of: " + String.join(", ", acceptedValues)
            ).addConstraintViolation();
        }
        return acceptedValues.contains(value.toString());
    }
}
