# Reusable Query Functions Examples

This file demonstrates how to use the reusable React Query functions for different API operations.

## Basic GET Requests

```typescript
import { useGet } from "@/lib/queries";

// Simple GET request
const { data, isLoading, error } = useGet<User[]>("/api/users");

// GET with parameters
const { data: posts } = useGet<Post[]>("/api/posts", {
  userId: 123,
  limit: 10,
});

// GET with custom configuration
const { data: profile } = useGet<UserProfile>(
  "/api/profile",
  { id: userId },
  {
    baseUrl: "https://api.example.com",
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  }
);
```

## POST Requests

```typescript
import { usePost } from '@/lib/queries';
import { queryClient } from '@tanstack/react-query';

const CreateUserForm = () => {
  const createUser = usePost<User, CreateUserData>('/api/users', {
    baseUrl: 'https://api.example.com',
  }, {
    onSuccess: (newUser) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('User created:', newUser);
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });

  const handleSubmit = (userData: CreateUserData) => {
    createUser.mutate(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button
        type="submit"
        disabled={createUser.isPending}
      >
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};
```

## PUT Requests

```typescript
import { usePut } from '@/lib/queries';

const EditUserForm = ({ userId }: { userId: string }) => {
  const updateUser = usePut<User, UpdateUserData>(`/api/users/${userId}`, {
    baseUrl: 'https://api.example.com',
  }, {
    onSuccess: (updatedUser) => {
      // Update the specific user in cache
      queryClient.setQueryData(['user', userId], updatedUser);
    },
  });

  const handleUpdate = (userData: UpdateUserData) => {
    updateUser.mutate(userData);
  };

  return (
    <form onSubmit={handleUpdate}>
      {/* form fields */}
      <button
        type="submit"
        disabled={updateUser.isPending}
      >
        {updateUser.isPending ? 'Updating...' : 'Update User'}
      </button>
    </form>
  );
};
```

## DELETE Requests

```typescript
import { useDelete } from '@/lib/queries';

const UserList = () => {
  const deleteUser = useDelete<void>('/api/users', {
    baseUrl: 'https://api.example.com',
  }, {
    onSuccess: () => {
      // Refetch users list after deletion
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure?')) {
      deleteUser.mutate(userId);
    }
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button
            onClick={() => handleDelete(user.id)}
            disabled={deleteUser.isPending}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
```

## Custom API Configurations

```typescript
import { apiGet, apiPost } from "@/lib/queries";

// Custom API for different service
const customApiConfig = {
  baseUrl: "https://custom-api.example.com",
  defaultHeaders: {
    Authorization: "Bearer " + token,
    "X-API-Version": "2.0",
  },
};

// Direct API calls (not using React Query)
const fetchCustomData = async () => {
  try {
    const data = await apiGet<CustomData>("/endpoint", {
      ...customApiConfig,
      params: { filter: "active" },
    });
    return data;
  } catch (error) {
    console.error("Custom API error:", error);
    throw error;
  }
};

// Custom React Query hook
const useCustomData = (filter: string) => {
  return useApiQuery(
    ["custom-data", filter],
    () =>
      apiGet<CustomData>("/endpoint", {
        ...customApiConfig,
        params: { filter },
      }),
    {
      enabled: !!filter,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
};
```

## Type Safety Examples

```typescript
// Define your API response types
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Use with typed responses
const { data: users } = useGet<ApiResponse<User[]>>("/api/users");

// POST with typed request and response
const createUser = usePost<ApiResponse<User>, CreateUserData>("/api/users");
```

These examples show how to use the reusable query functions for various API operations while maintaining type safety and proper error handling.
