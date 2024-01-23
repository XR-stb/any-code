package main

import (
	"fmt"
	"log"
	// "regexp"
	// "strings"

	"github.com/go-redis/redis"
)

func main() {
	// 替换为你的 Redis 连接信息
	redisHost := "localhost"
	redisPort := "6379"
	redisPassword := "" // 如果有密码，请提供密码

	// 创建 Redis 客户端
	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", redisHost, redisPort),
		Password: redisPassword,
		DB:       0, // 默认数据库
	})

	// 检查连接是否成功
	_, err := client.Ping().Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	// 要删除的键的前缀
	keyPrefixToDelete := "e2e_"

	// 获取匹配前缀的键
	keysToDelete, err := getKeysWithPrefix(client, keyPrefixToDelete)
	if err != nil {
		log.Fatalf("Error getting keys with prefix: %v", err)
	}

	if len(keysToDelete) > 0 {
		// 删除匹配的键
		deletedKeysCount, err := deleteKeys(client, keysToDelete)
		if err != nil {
			log.Fatalf("Error deleting keys: %v", err)
		}

		fmt.Printf("Deleted %d key(s) with prefix '%s': %v\n", deletedKeysCount, keyPrefixToDelete, keysToDelete)
	} else {
		fmt.Printf("No keys found with prefix '%s'.\n", keyPrefixToDelete)
	}
}

// 获取匹配前缀的键
func getKeysWithPrefix(client *redis.Client, prefix string) ([]string, error) {
	var keysToDelete []string

	// 使用 SCAN 命令获取匹配前缀的键
	var cursor uint64
	for {
		keys, nextCursor, err := client.Scan(cursor, fmt.Sprintf("%s*", prefix), 10).Result()
		if err != nil {
			return nil, err
		}

		keysToDelete = append(keysToDelete, keys...)

		// 如果游标为 0，说明遍历完成
		if nextCursor == 0 {
			break
		}

		cursor = nextCursor
	}

	return keysToDelete, nil
}

// 删除指定的键
func deleteKeys(client *redis.Client, keysToDelete []string) (int64, error) {
	// 使用 DEL 命令删除指定的键
	result, err := client.Del(keysToDelete...).Result()
	if err != nil {
		return 0, err
	}

	return result, nil
}
