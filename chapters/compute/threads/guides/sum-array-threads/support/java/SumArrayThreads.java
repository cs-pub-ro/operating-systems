// SPDX-License-Identifier: BSD-3-Clause

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

// todo: Import Executors from java.util.concurrent

/** SumArrayThreads class computes the sum of a large array in parallel. */
public final class SumArrayThreads {

  /** Length of the array. */
  private static final int ARR_LEN = 10000000;

  /** Private constructor to prevent instantiation. */
  private SumArrayThreads() {
    throw new AssertionError("Cannot instantiate utility class");
  }

  /**
   * Main method to execute the parallel sum computation.
   *
   * @param args The number of threads specified as a command-line argument
   */
  public static void main(final String[] args) {
    if (args.length < 1) {
      System.out.println("Usage: java SumArrayThreads <num_threads>");
      System.exit(1);
    }

    // todo: Parse the number of threads from the command-line arguments
    int numThreads;

    // Used for generating random array
    int[] arr = generateRandomArray(ARR_LEN);

    // todo: Set up a ThreadPoolExecutor with numThreads
    ExecutorService executor;

    // Used for measuring execution time
    long startTime = System.currentTimeMillis();

    // todo: Use "computeParallelSum" method
    long sum;

    executor.shutdown();

    long endTime = System.currentTimeMillis();

    System.out.println("Array sum is: " + sum);
    System.out.println("Time spent: " + (endTime - startTime) + " ms");
  }

  /**
   * Generates an array of random integers.
   *
   * @param length Size of the array
   * @return An array filled with integers
   */
  private static int[] generateRandomArray(final int length) {
    Random generator = new Random();
    final int maximum = 100;
    return generator.ints(length, 0, maximum).toArray();
  }

  /**
   * Computes the sum of the array by dividing the work among all threads.
   *
   * @param arr The array whose values will sum up
   * @param executor The executor service to manage threads
   * @param numThreads The number of threads
   * @return The computed sum of the array
   */
  private static long computeParallelSum(
      final int[] arr, final ExecutorService executor, final int numThreads) {
    List<Future<Long>> futures = new ArrayList<>();

    // Submit tasks to compute sum for each thread
    for (int i = 0; i < numThreads; i++) {
      int start = (int) (i * (double) (arr.length / numThreads));
      int firstPart = (int) ((i + 1) * (double) arr.length / numThreads);
      int end = Math.min(firstPart, arr.length);
      Future<Long> future =
          executor.submit(
              () -> {
                long sum = 0;
                for (int j = start; j < end; j++) {
                  sum += arr[j];
                }
                return sum;
              });
      futures.add(future);
    }

    // Combine the sums
    long totalSum = 0;
    for (Future<Long> future : futures) {
      try {
        totalSum += future.get();
      } catch (InterruptedException | ExecutionException e) {
        e.printStackTrace();
      }
    }

    return totalSum;
  }
}
