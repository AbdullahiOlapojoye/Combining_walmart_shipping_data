public class PowerOfTwoMaxHeap {
    private int[] heap;
    private int size;
    private int capacity;
    private int branchingFactorExponent;

    public PowerOfTwoMaxHeap(int initialCapacity, int branchingFactorExponent) {
        this.capacity = initialCapacity;
        this.heap = new int[capacity];
        this.size = 0;
        this.branchingFactorExponent = branchingFactorExponent;
    }

    private int parent(int i) {
        return (i - 1) / (1 << branchingFactorExponent);
    }

    private int child(int i, int k) {
        return (i * (1 << branchingFactorExponent)) + k + 1;
    }

    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }

    public void insert(int key) {
        if (size == capacity) {
            increaseCapacity();
        }
        heap[size] = key;
        int current = size;
        size++;

        // Bubble up to maintain heap property
        while (current != 0 && heap[current] > heap[parent(current)]) {
            swap(current, parent(current));
            current = parent(current);
        }
    }

    public int popMax() {
        if (size == 0) {
            throw new IllegalStateException("Heap is empty");
        }
        int max = heap[0];
        heap[0] = heap[size - 1];
        size--;
        maxHeapify(0);
        return max;
    }

    private void maxHeapify(int i) {
        int largest = i;
        for (int k = 0; k < (1 << branchingFactorExponent); k++) {
            int childIndex = child(i, k);
            if (childIndex < size && heap[childIndex] > heap[largest]) {
                largest = childIndex;
            }
        }

        if (largest != i) {
            swap(i, largest);
            maxHeapify(largest);
        }
    }

    private void increaseCapacity() {
        capacity *= 2;
        int[] newHeap = new int[capacity];
        System.arraycopy(heap, 0, newHeap, 0, heap.length);
        heap = newHeap;
    }

    // Optional: Implement a method to print heap
    public void printHeap() {
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }
}
