import '@testing-library/jest-dom'

// Полифилл для TextEncoder (для решения ошибки при запуске тестов "ReferenceError: TextEncoder is not defined")
import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextEncoder, TextDecoder })
