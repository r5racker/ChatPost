export const passMatch = (formGroup) => {
    const pass = formGroup.get('password');
    const cnfPass = formGroup.get('confPassword');
    if (pass.value !== cnfPass.value) {
        cnfPass.setErrors({ passwordMatch: true });
    }
    else {
        cnfPass.setErrors(null);
    }
}
