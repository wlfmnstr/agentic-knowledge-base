---
name: typescript-patterns
description: Type-safe development patterns, utility types, and TypeScript best practices
---

# TypeScript Patterns Skill

Expert knowledge for type-safe development with TypeScript.

## Type Safety Principles

### Prefer Type Inference

```typescript
// Let TypeScript infer when possible
const count = 42; // inferred as number
const name = "Alice"; // inferred as string

// Explicit when needed
const users: User[] = []; // empty array needs type

// Function return types: explicit for public APIs
export function getUser(id: string): User | null {
  // TypeScript can infer, but explicit is clearer
}
```

### Avoid `any`

```typescript
// Bad: Loses all type safety
function process(data: any) {
  return data.value;
}

// Good: Use proper types
function process(data: { value: string }) {
  return data.value;
}

// Good: Use generic for flexible types
function process<T>(data: T): T {
  return data;
}

// Good: Use unknown for truly unknown data
function parse(json: string): unknown {
  return JSON.parse(json);
}
```

### Strict Mode

Always enable strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Type Definitions

### Interfaces vs Types

```typescript
// Interface: For object shapes, extensible
interface User {
  id: string;
  name: string;
}

interface Admin extends User {
  role: 'admin';
}

// Type: For unions, intersections, computed types
type Status = 'idle' | 'loading' | 'success' | 'error';

type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Both work for objects, prefer interface for consistency
// Use type for unions, tuples, complex types
```

### Union Types

```typescript
// Literal unions for fixed values
type Theme = 'light' | 'dark' | 'auto';

// Union of types
type Response = SuccessResponse | ErrorResponse;

// Discriminated unions
type Result =
  | { success: true; data: string }
  | { success: false; error: string };

function handle(result: Result) {
  if (result.success) {
    // TypeScript knows result.data exists
    console.log(result.data);
  } else {
    // TypeScript knows result.error exists
    console.log(result.error);
  }
}
```

### Intersection Types

```typescript
// Combine multiple types
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: string;
  name: string;
} & Timestamped;

// Combining interfaces
interface Clickable {
  onClick: () => void;
}

interface Hoverable {
  onHover: () => void;
}

type Interactive = Clickable & Hoverable;
```

## Generic Types

### Basic Generics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

// Generic interface
interface Box<T> {
  value: T;
}

// Generic class
class Container<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}
```

### Constrained Generics

```typescript
// Constrain to objects with specific properties
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Constrain to types with certain shape
function processEntity<T extends { id: string }>(entity: T): string {
  return entity.id;
}

// Multiple constraints
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}
```

### Default Generic Parameters

```typescript
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

// Can omit type parameter
const response: ApiResponse = { data: "anything", status: 200 };

// Or provide specific type
const typedResponse: ApiResponse<User> = { data: user, status: 200 };
```

## Utility Types

### Built-in Utilities

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial: All properties optional
type PartialUser = Partial<User>;

// Required: All properties required
type RequiredUser = Required<PartialUser>;

// Pick: Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit: Exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Readonly: Make all properties readonly
type ImmutableUser = Readonly<User>;

// Record: Create object type with specific keys and value type
type UserMap = Record<string, User>;

// Exclude: Remove types from union
type ThemeWithoutAuto = Exclude<'light' | 'dark' | 'auto', 'auto'>;

// Extract: Keep only certain types from union
type PrimaryColors = Extract<'red' | 'blue' | 'green' | 'yellow', 'red' | 'blue'>;

// NonNullable: Remove null and undefined
type NonNullableUser = NonNullable<User | null | undefined>;

// ReturnType: Extract return type of function
function getUser() {
  return { id: '1', name: 'Alice' };
}
type UserType = ReturnType<typeof getUser>;

// Parameters: Extract parameter types of function
function createUser(id: string, name: string) {}
type CreateUserParams = Parameters<typeof createUser>; // [string, string]
```

### Custom Utility Types

```typescript
// Make specific properties optional
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = Optional<User, 'email'>;

// Make specific properties required
type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Nullable
type Nullable<T> = T | null;

// Awaited type (built-in, but useful to know)
type AwaitedUser = Awaited<Promise<User>>; // User
```

## Type Guards

### typeof Guards

```typescript
function process(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}
```

### instanceof Guards

```typescript
class Dog {
  bark() { console.log('Woof!'); }
}

class Cat {
  meow() { console.log('Meow!'); }
}

function handle(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

### Custom Type Guards

```typescript
interface User {
  type: 'user';
  name: string;
}

interface Admin {
  type: 'admin';
  name: string;
  permissions: string[];
}

// Type predicate
function isAdmin(user: User | Admin): user is Admin {
  return user.type === 'admin';
}

function greet(user: User | Admin) {
  if (isAdmin(user)) {
    // TypeScript knows user is Admin
    console.log(user.permissions);
  }
}
```

### Assertion Functions

```typescript
function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined');
  }
}

function process(value: string | null) {
  assertIsDefined(value);
  // TypeScript knows value is string here
  return value.toUpperCase();
}
```

## Advanced Patterns

### Mapped Types

```typescript
// Make all properties optional
type Optional<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties readonly
type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P];
};

// Transform property types
type Stringify<T> = {
  [P in keyof T]: string;
};

// Conditional property types
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

### Conditional Types

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Unwrap Promise type
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type Result = Unwrap<Promise<string>>; // string
```

### Template Literal Types

```typescript
// Route types
type Route = `/${string}`;

// Event types
type EventName = 'click' | 'hover' | 'focus';
type Handler = `on${Capitalize<EventName>}`; // 'onClick' | 'onHover' | 'onFocus'

// Combine string literals
type Color = 'red' | 'blue';
type Size = 'small' | 'large';
type Variant = `${Color}-${Size}`; // 'red-small' | 'red-large' | 'blue-small' | 'blue-large'
```

## Practical Patterns

### API Response Types

```typescript
// Generic API response
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Success/Error result
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await api.getUser(id);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

### Form Handling

```typescript
// Form field types
interface FormField<T> {
  value: T;
  error?: string;
  touched: boolean;
}

// Form state
type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

// Usage
interface LoginForm {
  email: string;
  password: string;
}

type LoginFormState = FormState<LoginForm>;
// {
//   email: FormField<string>;
//   password: FormField<string>;
// }
```

### Event Handlers

```typescript
// Type-safe event handlers
type EventMap = {
  'user:login': { userId: string; timestamp: Date };
  'user:logout': { userId: string };
  'data:updated': { id: string; data: unknown };
};

class EventEmitter {
  on<K extends keyof EventMap>(
    event: K,
    handler: (data: EventMap[K]) => void
  ): void {
    // Implementation
  }

  emit<K extends keyof EventMap>(
    event: K,
    data: EventMap[K]
  ): void {
    // Implementation
  }
}

// Usage is fully type-safe
const emitter = new EventEmitter();
emitter.on('user:login', (data) => {
  // data is typed as { userId: string; timestamp: Date }
  console.log(data.userId);
});
```

### Branded Types

```typescript
// Create distinct types for same underlying type
type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };

function getUserId(id: string): UserId {
  return id as UserId;
}

function getOrder(orderId: OrderId) {
  // Implementation
}

const userId = getUserId('user-123');
const orderId = 'order-456' as OrderId;

// This would cause a type error:
// getOrder(userId); // Error: UserId is not assignable to OrderId
```

## Configuration Patterns

### tsconfig.json Best Practices

```json
{
  "compilerOptions": {
    // Type checking
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,

    // Module resolution
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    // Emit
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,

    // Interop
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,

    // Skip lib check for faster builds
    "skipLibCheck": true,

    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Best Practices

### 1. Type Everything
```typescript
// Bad: Implicit any
function process(data) {
  return data.value;
}

// Good: Explicit types
function process(data: { value: string }): string {
  return data.value;
}
```

### 2. Use Readonly Where Appropriate
```typescript
// Immutable data structures
interface User {
  readonly id: string;
  name: string;
}

// Readonly arrays
function processItems(items: readonly string[]): string {
  // Cannot mutate items
  return items.join(',');
}
```

### 3. Prefer Union Types Over Enums
```typescript
// Instead of enum
enum Status {
  Idle = 'idle',
  Loading = 'loading',
}

// Prefer union type
type Status = 'idle' | 'loading' | 'success' | 'error';
```

### 4. Use const Assertions
```typescript
// Instead of
const colors = ['red', 'blue']; // string[]

// Use const assertion
const colors = ['red', 'blue'] as const; // readonly ['red', 'blue']

// For objects
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;
```

### 5. Leverage Type Narrowing
```typescript
function process(value: string | number | null) {
  // Null check
  if (value === null) {
    return 'null';
  }

  // typeof check
  if (typeof value === 'string') {
    return value.toUpperCase();
  }

  // TypeScript knows value is number here
  return value.toFixed(2);
}
```

## Common Pitfalls

### ❌ Type Assertions (Use Sparingly)
```typescript
// Avoid type assertions when possible
const user = data as User; // Bypasses type checking

// Better: Validate at runtime
function isUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'id' in data;
}

if (isUser(data)) {
  // data is User here
}
```

### ❌ Non-null Assertion (!)
```typescript
// Avoid when possible
const user = getUser()!; // Might be null!

// Better: Handle null case
const user = getUser();
if (user) {
  // Use user safely
}
```

### ❌ Empty Object Type
```typescript
// Bad: Too permissive
const config: {} = 'anything'; // Allows non-null values

// Good: Use object or Record
const config: object = { key: 'value' };
const settings: Record<string, unknown> = { key: 'value' };
```

---

*This skill provides comprehensive TypeScript patterns for type-safe development. Reference it for type definitions, generics, utilities, and best practices.*
