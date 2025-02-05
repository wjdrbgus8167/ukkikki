import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Solution2 {

    static int[] key1 = {1, 1, 2, 3, 3, 5, 6, 6, 6, 7};
    static int[] key2 = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11};
    static int inp;
    static boolean[][] isLinked = new boolean[12][12];
    static boolean[] visited = new boolean[12];

    public static void dfs(int node) {
        visited[node] = true;
        boolean isLeaf = true;

        for (int i = 1; i <= 11; i++) {
            if (isLinked[node][i] && !visited[i]) {
                isLeaf = false;
                dfs(i);
            }
        }

        if (isLeaf) {
            System.out.println(node);
        }
    }

    public int solution() {
        for (int i = 0; i < key1.length; i++) {
            isLinked[key1[i]][key2[i]] = true;
        }

        for (int i = 1; i <= 11; i++) {
            visited[i] = false;
        }

        dfs(inp);

        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        inp = sc.nextInt();

        Solution2 sol = new Solution2();
        sol.solution();
    }
}
