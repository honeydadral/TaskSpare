<template>
    <button @click="handleClick">{{ label }}</button>
</template>

<script>
export default {
    methods: {
        handleClick() {
            alert('Button clicked!')
        }
    },
    props: {
        label: {
            type: String,
            default: 'Click me'
        }
    }
}
</script>